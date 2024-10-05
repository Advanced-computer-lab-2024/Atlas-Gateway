import { Admin } from "../Database/Models/Users/admin.model";
import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";

import { Seller } from "../Database/Models/Users/seller.model";
import { Product } from "../Database/Models/product.model";
import AggregateBuilder from "../Services/aggregation.service";

//Create a new product entry
export const createProduct = async (req: Request, res: Response) => {
	try {
		const userId = req.headers.userid
		const { name, description, price, quantity, picture } = req.body;

		//Check if the user is an admin

		// TODO: retrieve ID checks from sessoin middleware rather than from the request
		const sellerId = (await Admin.findById(userId))
			? "000000000000000000000000"
			: new Types.ObjectId(Number(userId));
		//Check seller ID validity and existance
		if (
			(!Types.ObjectId.isValid(sellerId) ||
				!(await Seller.findById(sellerId))) &&
			sellerId != "000000000000000000000000"
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
		const result = await Product.aggregate(
			AggregateBuilder(
				req.query,
				["name"], // Search fields
				["minPrice", "maxPrice"], // Filters
				["rating"], // Sort fields
			),
		);

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
