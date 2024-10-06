import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { PipelineStage } from "mongoose";

import { Admin } from "../Database/Models/Users/admin.model";
import { Seller } from "../Database/Models/Users/seller.model";
import { Product } from "../Database/Models/product.model";
import AggregateBuilder from "../Services/aggregation.service";

//Create a new product entry
export const createProduct = async (req: Request, res: Response) => {
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
		//Check seller ID validity and existance

		if (!sellerId) {
			return res
				.status(400)
				.json({ message: "Atlas Gateway Seller not found" });
		}
		console.log(sellerId);
		if (
			!Types.ObjectId.isValid(String(sellerId)) ||
			!(await Seller.findById(String(sellerId)))
		) {
			return res
				.status(400)
				.json({ message: "Seller ID is invalid or doesn't exist" });
		}

		if (!name || !description || !price || !quantity || !picture) {
			return res.status(400).json({ message: "Misisng Fields" });
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
		console.log("Product Created");
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
		console.log(error);
	}
};

//takes an ID parameter and returns a single product
export const getProduct = async (req: Request, res: Response) => {
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
		res.status(500).json({ message: "Internal Server Error" });
		console.log(error);
	}
};

//takes a query (anded conditions) and returns a data set
export const getProducts = async (req: Request, res: Response) => {
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
		res.status(500).json({ message: "Internal Server Error" });
		console.log(error);
	}
};

//takes an ID and update the entry
export const updateProduct = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid product ID" });
		}

		const updateSet: any = {};

		if (req.body.name) {
			updateSet.name = req.body.name;
		}

		if (req.body.description) {
			updateSet.description = req.body.description;
		}

		if (req.body.price) {
			updateSet.price = req.body.price;
		}

		if (req.body.quantity) {
			updateSet.quantity = req.body.quantity;
		}

		if (req.body.picture) {
			updateSet.picture = req.body.picture;
		}

		const product = await Product.findByIdAndUpdate(id, updateSet, {
			new: true,
		});

		if (!product) {
			return res.status(404).json({
				message: "The product you are trying to update doesn't exist",
			});
		}

		res.status(200).send(product);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
		console.log(error);
	}
};
