import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { it } from "node:test";

import HttpError from "../../Errors/HttpError";
import { IProduct } from "../../Models/Purchases/product.model";
import { IActivity } from "../../Models/Travel/activity.model";
import { IItinerary } from "../../Models/Travel/itinerary.model";
import { Admin, IAdmin } from "../../Models/Users/admin.model";
import uniqueUsername from "../Auth/username.service";
import * as productService from "../Purchases/product.service";
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
	};
};

// TODO: Implement the report function waiting on the orders of the products
export const productsReport = async (
	options: { date?: string; ProductId?: string } = {},
) => {
	const admins = await getAllAdmins();

	if (!admins) {
		throw new HttpError(404, "No Admins Found");
	}

	// populate the products of the seller and the orders of the products

	const data = await productService.getAllProducts();
	let products: IProduct[] = data as IProduct[];

	// filter the products by the admins

	products = products.filter((product: IProduct) => {
		return admins.some((admin: IAdmin) => {
			return admin.id == product.sellerId;
		});
	});

	// if itineraryId is provided, filter the bookings by itineraryId
	if (options.ProductId) {
		products = products.filter(
			(product: IProduct) => product.id == options.ProductId,
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

		// TODO: Filter on the orders of the products by date

		// products = products.filter((product: IProduct) => {
		// 	const start = new Date(product);
		// 	console.log(start, startDate, endDate);
		// 	return start >= startDate && start <= endDate;
		// });
	}

	let totalSales = 0;

	let sales = products.map((product: IProduct) => {
		// totalSales +=
		// 	product.numberOfBookings *
		// 	((product.minPrice + product.maxPrice) / 2);

		return {
			ActivityId: product.id,
			ActivityName: product.name,
			// totalSales:
			// 	product.numberOfBookings *
			// 	((product.minPrice + product.maxPrice) / 2),
		};
	});

	return {
		data: sales,
		metaData: {
			totalSales: totalSales,
		},
	};
};

export const activityReport = async (
	options: { date?: string; ActivityId?: string } = {},
) => {
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
		};
	});

	return {
		data: sales,
		metaData: {
			totalSales: totalSales,
			totalBookings: totalBookings,
		},
	};
};

export const itineraryReport = async (
	options: { date?: string; itineraryId?: string } = {},
) => {
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
		};
	});

	return {
		data: sales,
		metaData: {
			totalSales: totalSales,
			totalBookings: totalBookings,
		},
	};
};
