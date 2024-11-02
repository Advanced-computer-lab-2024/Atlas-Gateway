import { NextFunction, Request, Response } from "express";

import HttpError from "../../Errors/HttpError";
import * as categoryService from "../../Services/Travel//category.service";

export const createCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { name } = req.body;
		if (!name) {
			throw new HttpError(400, "name is required");
		}

		const category = await categoryService.createCategory(name);

		res.status(201).json(category);
	} catch (error) {
		next(error);
	}
};

export const getCategories = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const categories = await categoryService.getCategories();

		res.status(200).json(categories);
	} catch (error) {
		next(error);
	}
};

export const getCategoryById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		if (!id) {
			throw new HttpError(400, "id is required");
		}

		const category = categoryService.getCategoryById(id);

		res.status(200).json(category);
	} catch (error) {
		next(error);
	}
};

export const updateCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const name = req.body.name;

		if (!id) {
			throw new HttpError(400, "id is required");
		}

		if (!name) {
			throw new HttpError(400, "name is required");
		}

		const category = await categoryService.updateCategory(id, name);

		res.status(200).json(category);
	} catch (error) {
		next(error);
	}
};

export const deleteCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		if (!id) {
			throw new HttpError(400, "id is required");
		}

		await categoryService.deleteCategory(id);

		res.status(200).send("category deleted successfully");
	} catch (error) {
		next(error);
	}
};
