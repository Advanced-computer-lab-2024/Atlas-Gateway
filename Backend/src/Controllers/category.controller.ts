import { Request, Response } from "express";

import { Category } from "../Database/Models/category.model";

import { Activity } from "../Database/Models/activity.model";

export const createCategory = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;
		if (!name) {
			res.status(400).send("name is required");
		}
		const category = await Category.create({ name });
		res.status(201).send(category);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error create an activity category");
	}
};

export const getCategories = async (req: Request, res: Response) => {
	try {
		const categories = await Category.find();
		res.status(200).send(categories);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error getting activity categories");
	}
};

export const getCategoryById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const category = await Category.findById(id);
		res.status(200).send(category?.name);
	} catch (error) {
		res.status(500).send("Error getting category by id");
	}
};

export const updateCategory = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name } = req.body;
		const category = await Category.findByIdAndUpdate(
			id,
			{ name },
			{ new: true },
		);
		if (!category) {
			return res.status(404).send("Cant find Activity");
		}
		res.status(200).send(category);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error updating activity category");
	}
};

export const deleteCategory = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await Category.findByIdAndDelete(id);
		await Activity.deleteMany(
			{"category": id}
		)
		res.status(200).send("Category deleted Succefully");
	} catch (error) {
		console.log(error);
		res.status(500).send("Error deleting Category");
	}
};
