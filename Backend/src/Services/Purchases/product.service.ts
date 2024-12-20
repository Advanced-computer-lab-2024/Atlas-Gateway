import mongoose, { PipelineStage, Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { IProduct, Product } from "../../Models/Purchases/product.model";
import AggregateBuilder from "../Operations/aggregation.service";
import * as adminService from "../Users/admin.service";
import * as sellerService from "../Users/seller.service";
import * as touristService from "../Users/tourist.service";

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

const productFiltersMap: Record<string, PipelineStage> = {
	tourist: {
		$match: {
			isArchived: false, // TODO: Add appropriate filter
			isDeleted: false,
		},
	},
	default: {
		$match: {},
	},
};

export const getAllProducts = async () => {
	const products = await Product.find();

	return products;
};

export const getProducts = async (type: string, query?: any) => {
	const filter =
		productFiltersMap?.[type as keyof typeof productFiltersMap] ||
		productFiltersMap.default;

	const PipelineStage: PipelineStage[] = [
		filter,
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

export const getProductBySellerId = async (sellerId: string) => {
	if (!Types.ObjectId.isValid(sellerId)) {
		throw new HttpError(400, "Invalid seller ID");
	}

	const products = await Product.find({ sellerId });

	return products;
};

export const deleteProduct = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid product ID");
	}

	const product = await Product.findByIdAndDelete(id);

	return product;
};

export const addwhishlist = async (touristId: string, productId: string) => {
	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		const product = await getProductById(productId);
		if (!product) {
			throw new HttpError(404, "Product not found");
		}
		const tourist = await touristService.addwishlistProduct(
			touristId,
			productId,
		);
		if (!tourist) {
			throw new HttpError(404, "Could not add product to wishlist");
		}
		await product.updateOne({
			$push: { touristWishlist: touristId },
		});
		await session.commitTransaction();
		return product;
	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

export const removeWishlist = async (touristId: string, productId: string) => {
	const session = await mongoose.startSession();

	try {
		session.startTransaction();
		const product = await getProductById(productId);
		if (!product) {
			throw new HttpError(404, "Product not found");
		}
		const tourist = await touristService.removeWishlistProduct(
			touristId,
			productId,
		);
		if (!tourist) {
			throw new HttpError(404, "Could not remove product from wishlist");
		}
		await product.updateOne({
			$pull: { touristWishlist: touristId },
		});
		await session.commitTransaction();
		return product;
	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
};

export const softDeleteProduct = async (id: string) => {
	const product = await getProductById(id);

	if (!product) {
		throw new HttpError(404, "Product not found");
	}

	await product.updateOne({ isDeleted: true });

	return product;
};
