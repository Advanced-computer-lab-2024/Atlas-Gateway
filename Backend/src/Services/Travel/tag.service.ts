import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Activity } from "../../Models/Travel/activity.model";
import { Tag } from "../../Models/Travel/tag.model";

export const createHistTag = async (name: string, type: string) => {
	const tag = new Tag({
		name,
		type,
	});

	await tag.save();

	return tag;
};

export const getHistTags = async () => {
	const dataset = await Tag.find({ type: { $ne: "Preference" } });

	return dataset;
};

export const createPrefTag = async (name: string) => {
	const tag = new Tag({
		name,
		type: "Preference",
	});

	await tag.save();

	return tag;
};

export const getPrefTags = async () => {
	const dataset = await Tag.find({ type: "Preference" });

	return dataset;
};

export const updatePrefTag = async (id: string, name: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid ID");
	}

	const tag = await Tag.findOneAndUpdate(
		{ _id: id, type: "Preference" },
		{ name },
		{ new: true },
	);

	return tag;
};

export const deletePreTag = async (id: string) => {
	//making sure I can only update and delete preference tags

	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid ID");
	}

	const tag = await Tag.findOne({ _id: id, type: "Preference" });

	if (!tag) {
		throw new HttpError(404, "Tag is not Found");
	}

	//Delete all references in activities
	const updateSet = await Activity.updateMany(
		{ tags: { $in: [id] } },
		{ $pull: { tags: id } },
	);

	await tag.deleteOne();

	//remove references first then delete the tag cuz of dependencies (not sure how they work, but just in case it matters, validations were already made)

	return { tag, updateSet };
};

export const getAllTags = async () => {
	const dataset = await Tag.find();
	return dataset;
};
