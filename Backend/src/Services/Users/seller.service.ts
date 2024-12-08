import { PipelineStage, Types } from "mongoose";

import {
	IProductDTO,
	IProductReportResponse,
} from "../../DTOS/Report/ProductReportResponse";
import HttpError from "../../Errors/HttpError";
import { Order } from "../../Models/Purchases/order.model";
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
			throw new HttpError(401, "Seller is not Verified");
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

// TODO: Implement the report function waiting on the orders of the products
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
			},
		},
	];

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

		pipeline.push({
			$match: {
				date: {
					$gte: startDate,
					$lte: endDate,
				},
			},
		});
	}

	// if ProductId is provided, filter the bookings by ProductId
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

	const orders = await Order.aggregate(pipeline);
	let totalSales = 0;

	const sales: IProductDTO[] = orders.map((order) => {
		const sales =
			order.products[0].quantity * order.products[0].product.price;

		const adminProfit = sales * 0.1;

		totalSales += sales - adminProfit;

		return {
			ProductId: order.products[0].productId,
			ProductName: order.products[0].product.name,
			quantity: order.products[0].quantity,
			sales: sales - adminProfit,
		} as IProductDTO;
	});

	return {
		data: sales,
		metaData: {
			totalSales: totalSales,
		},
	} as IProductReportResponse;
};
