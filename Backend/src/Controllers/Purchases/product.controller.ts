import { NextFunction, Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { PipelineStage } from "mongoose";

import { Product } from "../../Models/Purchases/product.model";
import { Admin } from "../../Models/Users/admin.model";
import { Seller } from "../../Models/Users/seller.model";
import AggregateBuilder from "../../Services/Operations/aggregation.service";

//Create a new product entry
export const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.headers.userid;
		const { name, description, price, quantity, picture } = req.body;

		//Check if the user is an admin

		const sellerId =
			userId === "123456"
				? (
						await Seller.findOne({
							username: "Atlas Gateway",
						}).select("_id")
					)?._id
				: new Types.ObjectId(String(userId));
		//Check seller ID validity and existence

		if (!sellerId) {
			return res
				.status(400)
				.json({ message: "Atlas Gateway Seller not found" });
		}

		const seller = await Seller.findById(String(sellerId));

		if (!Types.ObjectId.isValid(String(sellerId)) || !seller) {
			return res
				.status(400)
				.json({ message: "Seller ID is invalid or doesn't exist" });
		}

		if (!name || !description || !price || !quantity || !picture) {
			return res.status(400).json({ message: "Missing Fields" });
		}

		const product = new Product({
			sellerId,
			name,
			description,
			price,
			quantity,
			picture,
		});

		await product.save();
		res.status(200).send(product);
	} catch (error) {
		next(error);
	}
};

//takes an ID parameter and returns a single product
export const getProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: "Invalid product ID" });
		}

		const product = await Product.findById(id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.status(200).send(product);
	} catch (error) {
		next(error);
	}
};

//takes a query (and conditions) and returns a data set
export const getProducts = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const PipelineStage: PipelineStage[] = [
			...AggregateBuilder(
				req.query,
				["name"], // Search fields
			),
		];
		const result = await Product.aggregate(PipelineStage);

		if (result[0].data.length === 0) {
			return res
				.status(404)
				.json({ message: "No matching Products Found" });
		}

		const response = {
			data: result[0].data,
			metaData: {
				page: req.query.page || 1,
				total: result[0].total[0].count,
				pages: Math.ceil(
					result[0].total[0].count / (Number(req.query.limit) || 10),
				),
			},
		};

		res.status(200).send(response);
	} catch (error) {
		next(error);
	}
};

//takes an ID and update the entry
export const updateProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid product ID" });
		}

		const product = await Product.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!product) {
			return res.status(404).json({
				message: "The product you are trying to update doesn't exist",
			});
		}

		res.status(200).send(product);
	} catch (error) {
		next(error);
	}
};
