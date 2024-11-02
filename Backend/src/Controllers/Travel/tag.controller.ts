import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import { Activity } from "../../Models/Travel/activity.model";
import { Tag } from "../../Models/Travel/tag.model";

//Creates a historical location tag --Tourism Governor Only
export const createHistTag = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { name, type } = req.body;

		if (!name || !type)
			return res
				.status(400)
				.json({ message: "Missing tag type or name" });

		const tag = new Tag({
			name,
			type,
		});

		await tag.save();

		res.status(200).send(tag);
	} catch (error) {
		next(error);
	}
};

//Retrieve all historical location tags --Used in many things
export const getHistTags = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const dataset = await Tag.find({ type: { $ne: "Preference" } });
		res.status(200).send(dataset);
	} catch (error) {
		next(error);
	}
};

//Creates a preference tag --Admin only
export const createPrefTag = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { name } = req.body;
		if (!name) {
			return res.status(400).json({ message: "Tag name missing" });
		}
		const type = "Preference";
		const tag = new Tag({
			name,
			type: type,
		});

		await tag.save();

		res.status(200).send(tag);
	} catch (error) {
		next(error);
	}
};

//Retrieve all preference tags --Used in many things
export const getPrefTags = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const dataset = await Tag.find({ type: "Preference" });
		res.status(200).send(dataset);
	} catch (error) {
		next(error);
	}
};

//Updates a preference tag --Admin only (not needed )
export const updatePrefTag = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		const { name } = req.body;

		//making sure I can only update and delete preference tags
		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid ID" });
		}

		if (!name) {
			return res.status(400).json({ message: "Tag name missing" });
		}

		const tag = await Tag.findOneAndUpdate(
			{ _id: id, type: "Preference" },
			{ name },
			{ new: true },
		);

		if (!tag) {
			return res
				.status(404)
				.json({ message: "Tag not found or not a preference tag" });
		}

		res.status(200).json(tag);
	} catch (error) {
		next(error);
	}
};

//Delete a preference tag along with it's references in activities/itineraries
export const deletePreTag = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		//making sure I can only update and delete preference tags

		if (
			!Types.ObjectId.isValid(id) ||
			(await Tag.find({ _id: id, type: "Preference" })).length === 0
		) {
			return res.status(400).json({ message: "Invalid ID" });
		}

		//Delete all references in activities
		const updateSet = await Activity.updateMany(
			{ tags: { $in: [id] } },
			{ $pull: { tags: id } },
		);

		//Delete the ID document itself
		const tagDoc = await Tag.findByIdAndDelete(id);

		//remove references first then delete the tag cuz of dependencies (not sure how they work, but just in case it matters, validations were already made)

		res.status(200).json({
			message: "Tag deleted",
			activities_affected: updateSet.modifiedCount,
		});

		console.log("Deleted tag: ", tagDoc);
	} catch (error) {
		next(error);
	}
};

export const getAllTags = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const dataset = await Tag.find();
		res.status(200).send(dataset);
	} catch (error) {
		next(error);
	}
};
