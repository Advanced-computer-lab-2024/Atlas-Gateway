import { NextFunction, Request, Response } from "express";



import HttpError from "../../Errors/HttpError";
import * as productService from "../../Services/Purchases/product.service";


//Create a new product entry
export const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.headers.userid;
		const { name, description, price, quantity } = req.body;

		if (!userId) {
			throw new HttpError(400, "Logged in User id is required");
		}

		if (!name || !description || !price || !quantity) {
			throw new HttpError(
				400,
				"name , description, price, quantity and picture are required",
			);
		}

		const product = await productService.createProduct(
			userId.toString(),
			name,
			description,
			price,
			quantity,
		);
		res.status(201).send(product);
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
		if (!id) {
			throw new HttpError(400, "id is required");
		}

		const product = await productService.getProductById(id);

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
		const usertype = req.headers.usertype as string;

		if (!usertype) {
			throw new HttpError(400, "User type is required");
		}

		const result = await productService.getProducts(usertype, req.query);
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
		if (!id) {
			throw new HttpError(400, "id is required");
		}

		const product = await productService.updateProduct(id, req.body);

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

export const addwishlistProduct = async(
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.headers.userid;
		const productId = req.params.id;

		if (!userId) {
			throw new HttpError(400, "Logged in User id is required");
		}

		if (!productId) {
			throw new HttpError(400, "Product id is required");
		}

		const product = await productService.addwhishlistProduct(
			userId.toString(),
			productId,
		);
		res.status(200).send(product);
	} catch (error) {
		next(error);
	}
}

export const removeWishlistProduct = async(
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.headers.userid;
		const productId = req.params.id;
		if (!userId) {
			throw new HttpError(400, "Logged in User id is required");
		}
		if (!productId) {
			throw new HttpError(400, "Product id is required");
		}
		const product = await productService.removeWishlistProduct(
			userId.toString(),
			productId,
		);
		res.status(200).send(product);
	} catch (error) {
		next(error);
	}
}