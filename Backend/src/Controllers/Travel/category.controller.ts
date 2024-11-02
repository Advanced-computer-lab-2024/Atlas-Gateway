import { Request, Response } from "express";
import { Types } from "mongoose";

import { Activity } from "../../Models/Travel/activity.model";
import { Category } from "../../Models/Travel/category.model";

export const createCategory = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;
		if (!name) {
			res.status(400).send("name is required");
		}
		const category = await Category.create({ name });
		res.status(201).json(category);
	} catch (error) {
		console.log(error);
		res.status(500).send("error create an activity category");
	}
};

export const getCategories = async (req: Request, res: Response) => {
	try {
		const categories = await Category.find();
		res.status(200).json(categories);
	} catch (error) {
		console.log(error);
		res.status(500).send("error getting activity categories");
	}
};

export const getCategoryById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).send("id is Invalid");
		}

		const category = await Category.findById(id);
		res.status(200).json(category);
	} catch (error) {
		res.status(500).send("error getting category by id");
	}
};

export const updateCategory = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).send("id is Invalid");
		}
		const { name } = req.body;
		const category = await Category.findByIdAndUpdate(
			id,
			{ name },
			{ new: true },
		);
		if (!category) {
			res.status(404).send("cant find activity category");
		}
		res.status(200).json(category);
	} catch (error) {
		console.log(error);
		res.status(500).send("error updating activity category");
	}
};

export const deleteCategory = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).send("id is Invalid");
		}
		const category = await Category.findByIdAndDelete(id);
		if (!category) {
			res.status(404).send("can't find activity category");
		}
		await Activity.deleteMany({ category: id });
		res.status(200).send("category deleted successfully");
	} catch (error) {
		console.log(error);
		res.status(500).send("error deleting category");
	}
};
