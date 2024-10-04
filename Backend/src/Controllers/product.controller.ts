import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";

import { Seller } from "../Database/Models/Users/seller.model";
import { Product } from "../Database/Models/product.model";
import searchFilterSort from "../Services/search-filter-sort.service";

//Create a new product entry
export const createProduct = async (req: Request, res: Response) => {
	try {
		//console.log(req.body);
		const { sellerId, name, description, price, quantity, picture } =
			req.body;

		//TODO: Check seller ID validity and existance
		if (
			!Types.ObjectId.isValid(sellerId) ||
			!(await Seller.findById(sellerId))
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
		//TODO: Remember to fetch by ID
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
		const querySet: any = {};

		if (req.body.name) {
			querySet.name = req.body.name;
		}

		if (req.body.priceRange) {
			const { min, max } = req.body.priceRange; // Expecting { "priceRange": { "min": 50, "max": 150 } }
			if (min !== undefined && max !== undefined) {
				querySet.price = { $gte: min, $lte: max }; // Query for price range
			} else if (min !== undefined) {
				querySet.price = { $gte: min }; // Query for minimum price only
			} else if (max !== undefined) {
				querySet.price = { $lte: max }; // Query for maximum price only
			}
		}

		//console.log(querySet);

		const dataSet = await Product.find(querySet);

		if (dataSet.length == 0) {
			return res
				.status(404)
				.json({ message: "No matching Products Found" });
		}

		//console.log(dataSet);

		res.status(200).send(dataSet);
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
