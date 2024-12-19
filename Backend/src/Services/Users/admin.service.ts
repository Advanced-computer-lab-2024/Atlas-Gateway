import bcrypt from "bcryptjs";
import { PipelineStage, Types } from "mongoose";

import {
	IActivityDTO,
	IActivityReportResponse,
} from "../../DTOS/Report/ActivityReportResponse";
import { IAdminReportResponse } from "../../DTOS/Report/AdminReportResponse";
import {
	IItineraryDTO,
	IItineraryReportResponse,
} from "../../DTOS/Report/ItineraryReportResponse";
import {
	IProductDTO,
	IProductReportResponse,
} from "../../DTOS/Report/ProductReportResponse";
import HttpError from "../../Errors/HttpError";
import { EOrderStatus, Order } from "../../Models/Purchases/order.model";
import { IActivity } from "../../Models/Travel/activity.model";
import { IItinerary } from "../../Models/Travel/itinerary.model";
import { Admin, IAdmin } from "../../Models/Users/admin.model";
import uniqueUsername from "../Auth/username.service";
import * as activityService from "../Travel/activity.service";
import * as itineraryService from "../Travel/itinerary.service";

export const createAdmin = async (
	username: string,
	email: string,
	password: string,
): Promise<IAdmin> => {
	const resultUnique = await uniqueUsername(username);
	if (!resultUnique) {
		throw new HttpError(400, "Username should be unique");
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const admin = await Admin.create({
		username,
		email,
		password: hashedPassword,
	});
	return admin;
};

export const getAdminById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new Error("Invalid ID");
	}
	const admin = await Admin.findById(id);
	return admin;
};

export const getAllAdmins = async () => {
	return await Admin.find();
};

export const deleteAdmin = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new Error("Invalid ID");
	}
	const admin = await Admin.findByIdAndDelete(id);
	if (!admin) {
		throw new Error("Admin not found");
	}
	return admin;
};

export const report = async (
	options: {
		date?: string;
		ProductId?: string;
		activityId?: string;
		itinararyId?: string;
	} = {},
) => {
	const products = await productsReport({
		date: options.date,
		ProductId: options.ProductId,
	});

	const itineraries = await itineraryReport({
		date: options.date,
		itineraryId: options.itinararyId,
	});
	const activities = await activityReport({
		date: options.date,
		ActivityId: options.activityId,
	});

	const sales =
		itineraries.metaData.totalSales + activities.metaData.totalSales;
	return {
		data: {
			products,
			itineraries,
			activities,
		},
		metaData: {
			totalSales: products.metaData.totalSales + sales * 0.1,
			totalBookings:
				itineraries.metaData.totalBookings +
				activities.metaData.totalBookings,
		},
	} as IAdminReportResponse;
};

// TODO: Implement the report function waiting on the orders of the products
export const productsReport = async (
	options: {
		date?: string;
		ProductId?: string;
	} = {},
): Promise<IProductReportResponse> => {
	const admins = await getAllAdmins();

	// Build the initial aggregation pipeline
	const pipeline: PipelineStage[] = [
		{
			$match: {
				"products.product.sellerId": {
					$in: admins.map((admin) => new Types.ObjectId(admin.id)),
				},
				status: EOrderStatus.COMPLETED,
			},
		},
	];

	// Filter by date if provided
	if (options.date) {
		const [startDateStr, endDateStr] = options.date.split(",");
		const startDate = startDateStr
			? new Date(`${startDateStr}T00:00:00.000Z`)
			: new Date("1970-01-01T00:00:00.000Z");
		const endDate =
			endDateStr && endDateStr !== "null"
				? new Date(`${endDateStr}T23:59:59.999Z`)
				: new Date();

		if (startDate > endDate) {
			throw new HttpError(400, "Invalid Date Range");
		}

		pipeline.push({
			$match: {
				date: {
					$gte: startDate,
					$lte: endDate,
				},
			},
		});
	}

	// Filter by ProductId if provided
	if (options.ProductId) {
		if (!Types.ObjectId.isValid(options.ProductId)) {
			throw new HttpError(400, "ProductId is Invalid");
		}
		const productId = new Types.ObjectId(options.ProductId);

		pipeline.push({
			$match: {
				"products.productId": productId,
			},
		});
	}

	// Unwind the products array to process each product separately
	pipeline.push({ $unwind: "$products" });

	// Group by ProductId to aggregate sales and quantities
	pipeline.push({
		$group: {
			_id: "$products.productId",
			ProductName: { $first: "$products.product.name" }, // Adapt to your schema
			totalQuantity: { $sum: "$products.quantity" },
			totalSales: {
				$sum: {
					$multiply: [
						"$products.quantity",
						"$products.product.price",
					],
				},
			},
		},
	});

	// Fetch the aggregated data
	const productAggregates = await Order.aggregate(pipeline);

	// Transform the aggregated data into IProductDTO format
	const data: IProductDTO[] = productAggregates.map((product) => ({
		ProductId: product._id.toString(),
		ProductName: product.ProductName,
		quantity: product.totalQuantity,
		sales: product.totalSales,
	}));

	// Calculate total sales and total bookings
	const totalSales = data.reduce((acc, item) => acc + item.sales, 0);
	const totalBookings = data.reduce((acc, item) => acc + item.quantity, 0);

	// Construct the response object
	const response: IProductReportResponse = {
		data,
		metaData: {
			totalSales,
			totalBookings,
		},
	};

	return response;
};

export const activityReport = async (
	options: { date?: string; ActivityId?: string } = {},
): Promise<IActivityReportResponse> => {
	const data = await activityService.getAllActivities();

	let activities: IActivity[] = data;
	// if itineraryId is provided, filter the bookings by itineraryId
	if (options.ActivityId) {
		activities = activities.filter(
			(activity: IActivity) => activity.id == options.ActivityId,
		);
	}

	// if date is provided, filter the bookings by date
	if (options.date) {
		const [startDateStr, endDateStr] = options.date.split(",");

		// if no date is provided, set the start date the lowest possible date and the end date to today
		let startDate =
			new Date(`${startDateStr}T00:00:00.000+00:00`) ||
			new Date("1970-01-01T00:00:00.000+00:00");
		let endDate =
			endDateStr !== "null"
				? new Date(`${endDateStr}T23:59:59.000+00:00`)
				: new Date();

		if (startDate > endDate) {
			throw new HttpError(400, "Invalid Date Range");
		}

		activities = activities.filter((activity: IActivity) => {
			const start = new Date(activity.dateTime);
			return start >= startDate && start <= endDate;
		});
	}

	let totalSales = 0;
	let totalBookings = 0;

	let sales = activities.map((activity: IActivity) => {
		totalSales +=
			activity.numberOfBookings *
			((activity.minPrice + activity.maxPrice) / 2);

		totalBookings += activity.numberOfBookings;
		return {
			ActivityId: activity.id,
			ActivityName: activity.name,
			numberOfBookings: activity.numberOfBookings,
			totalSales:
				activity.numberOfBookings *
				((activity.minPrice + activity.maxPrice) / 2),
		} as IActivityDTO;
	});

	return {
		data: sales,
		metaData: {
			totalSales: totalSales,
			totalBookings: totalBookings,
		},
	} as IActivityReportResponse;
};

export const itineraryReport = async (
	options: { date?: string; itineraryId?: string } = {},
): Promise<IItineraryReportResponse> => {
	const data = await itineraryService.getAllItineraries();

	let itineraries: IItinerary[] = data;

	// if itineraryId is provided, filter the bookings by itineraryId
	if (options.itineraryId) {
		itineraries = itineraries.filter(
			(itinerary: IItinerary) => itinerary.id == options.itineraryId,
		);
	}

	// if date is provided, filter the bookings by date
	if (options.date) {
		const [startDateStr, endDateStr] = options.date.split(",");

		// if no date is provided, set the start date the lowest possible date and the end date to today
		let startDate =
			new Date(`${startDateStr}T00:00:00.000+00:00`) ||
			new Date("1970-01-01T00:00:00.000+00:00");
		let endDate =
			endDateStr !== "null"
				? new Date(`${endDateStr}T23:59:59.000+00:00`)
				: new Date();

		if (startDate > endDate) {
			throw new HttpError(400, "Invalid Date Range");
		}

		itineraries = itineraries.filter((itinerary: IItinerary) => {
			const start = new Date(itinerary.startDateTime);
			return start >= startDate && start <= endDate;
		});
	}

	let totalSales = 0;
	let totalBookings = 0;

	let sales = itineraries.map((itinerary: IItinerary) => {
		totalSales += itinerary.numberOfBookings * itinerary.price;
		totalBookings += itinerary.numberOfBookings;
		return {
			itineraryId: itinerary.id,
			itineraryName: itinerary.title,
			numberOfBookings: itinerary.numberOfBookings,
			totalSales: itinerary.numberOfBookings * itinerary.price,
		} as IItineraryDTO;
	});

	return {
		data: sales,
		metaData: {
			totalSales: totalSales,
			totalBookings: totalBookings,
		},
	} as IItineraryReportResponse;
};
