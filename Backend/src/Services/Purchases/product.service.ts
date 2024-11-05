import { PipelineStage, Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { IProduct, Product } from "../../Models/Purchases/product.model";
import AggregateBuilder from "../Operations/aggregation.service";
import * as adminService from "../Users/admin.service";
import * as sellerService from "../Users/seller.service";

export const createProduct = async (
	userId: string,
	name: string,
	description: string,
	price: Number,
	quantity: Number,
) => {
	if (!Types.ObjectId.isValid(userId)) {
		throw new HttpError(400, "User id is invalid");
	}

	let user;
	user = await adminService.getAdminById(userId);

	if (!user) {
		user = await sellerService.getSellerById(userId);
		if (!user) {
			throw new HttpError(404, "User Id is not Found in database");
		}
	}

	const product = new Product({
		sellerId: user.id,
		name,
		description,
		price,
		quantity,
	});

	await product.save();

	return product;
};

export const getProducts = async (query?: any) => {
	const PipelineStage: PipelineStage[] = [
		...AggregateBuilder(
			query,
			["name"], // Search fields
		),
	];
	const result = await Product.aggregate(PipelineStage);

	return result;
};

export const getProductById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid product ID");
	}

	const product = await Product.findById(id);

	return product;
};

export const updateProduct = async (
	id: string,
	newProduct: Partial<IProduct>,
) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid product ID");
	}

	const product = await Product.findByIdAndUpdate(id, newProduct, {
		new: true,
	});

	return product;
};
