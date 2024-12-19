import { PipelineStage, Types } from "mongoose";

import {
	IProductDTO,
	IProductReportResponse,
} from "../../DTOS/Report/ProductReportResponse";
import HttpError from "../../Errors/HttpError";
import { EOrderStatus, Order } from "../../Models/Purchases/order.model";
import { IProduct } from "../../Models/Purchases/product.model";
import { ISeller, Seller } from "../../Models/Users/seller.model";
import { hashPassword } from "../Auth/password.service";
import uniqueUsername from "../Auth/username.service";
import * as productService from "../Purchases/product.service";
import * as adminService from "./admin.service";

export const createSeller = async (
	username: string,
	email: string,
	password: string,
) => {
	const resultUnique = await uniqueUsername(username);
	if (!resultUnique) {
		throw new HttpError(400, "Username Should Be Unique");
	}
	const hashedPassword = await hashPassword(password);
	const user = await Seller.create({
		username: username,
		email: email,
		password: hashedPassword,
	});

	return user;
};

export const getSellerById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const seller = await Seller.findById(id);

	return seller;
};

export const getSellers = async () => {
	return Seller.find();
};

export const updateSeller = async (
	id: string,
	userid: string,
	newSeller: Partial<ISeller>,
) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Id is Invalid ");
	}
	if (!Types.ObjectId.isValid(userid)) {
		throw new HttpError(400, "User Id is Invalid ");
	}

	const admin = await adminService.getAdminById(userid);
	if (!admin) {
		const seller = await Seller.findById(id);
		const overRide = true
			? Object.keys(newSeller)[0] == "idPath" ||
				Object.keys(newSeller)[0] == "taxCardPath" ||
				Object.keys(newSeller)[0] == "imagePath"
			: false;
		if (!seller?.isVerified && !overRide) {
			if (!newSeller?.acceptedTerms) {
				throw new HttpError(401, "Seller is not Verified");
			}
		}
	}
	const seller = await Seller.findByIdAndUpdate(id, newSeller, {
		new: true,
	});

	return seller;
};

export const deleteSeller = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Id is Invalid");
	}
	const seller = await Seller.findByIdAndDelete(id);

	if (!seller) {
		throw new HttpError(404, "Seller not Found");
	}

	const products = await productService.getProductBySellerId(id);
	for (const product of products) {
		await productService.deleteProduct(product.id.toString());
	}

	return seller;
};

export const softDeleteSeller = async (id: string) => {
	const seller = await getSellerById(id);
	if (!seller) {
		throw new HttpError(404, "Seller not Found");
	}
	const products = await productService.getProductBySellerId(id);

	for (const product of products) {
		await productService.softDeleteProduct(product.id.toString());
	}

	await seller.updateOne({ isDeleted: true });

	return seller;
};

export const report = async (
	id: string,
	options: { date?: string; ProductId?: string } = {},
): Promise<IProductReportResponse> => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Id is Invalid");
	}

	const pipeline: PipelineStage[] = [
		{
			$match: {
				"products.product.sellerId": new Types.ObjectId(id),
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

	// Unwind products array to process each product in the orders individually
	pipeline.push({ $unwind: "$products" });

	// Match the sellerId again for unwound products to ensure relevance
	pipeline.push({
		$match: {
			"products.product.sellerId": new Types.ObjectId(id),
		},
	});

	// Group by ProductId to aggregate sales and quantities
	pipeline.push({
		$group: {
			_id: "$products.productId",
			name: { $first: "$products.product.name" }, // Adapt this to your schema
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

	// Transform the aggregated data to match IProductDTO structure
	const data: IProductDTO[] = productAggregates.map((product) => ({
		ProductId: product._id.toString(),
		ProductName: product.name,
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
