import { IProduct } from "@/Models/Purchases/product.model";
import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
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
) => {
	const seller = await getSellerById(id);

	if (!seller) {
		throw new HttpError(404, "Tour Guide not Found");
	}

	// populate the products of the seller and the orders of the products

	await seller.populate("Products");

	let products: IProduct[] = seller.Products as IProduct[];

	// if itineraryId is provided, filter the bookings by itineraryId
	if (options.ProductId) {
		products = products.filter(
			(activity: IProduct) => activity.id == options.ProductId,
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

	console.log(products);

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
