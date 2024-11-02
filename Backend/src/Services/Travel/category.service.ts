import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Activity } from "../../Models/Travel/activity.model";
import { Category } from "../../Models/Travel/category.model";

export const createCategory = async (name: string) => {
	const category = await Category.create({ name });

	return category;
};
export const getCategories = async () => {
	const categories = await Category.find();
	return categories;
};
export const getCategoryById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is Invalid");
	}

	const category = await Category.findById(id);

	return category;
};

export const updateCategory = async (id: string, name: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is Invalid");
	}
	const category = await Category.findByIdAndUpdate(
		id,
		{ name },
		{ new: true },
	);
	if (!category) {
		throw new HttpError(404, "cant find activity category");
	}

	return category;
};

export const deleteCategory = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is Invalid");
	}
	const category = await Category.findByIdAndDelete(id);
	if (!category) {
		throw new HttpError(404, "cant find activity category");
	}
	await Activity.deleteMany({ category: id });

	return category;
};
