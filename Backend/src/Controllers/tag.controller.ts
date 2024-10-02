import { Request, Response } from "express";
import { Types } from "mongoose";

import { Activity } from "../Database/Models/activity.model";
import { Tag } from "../Database/Models/tag.model";

//Creates a historical location tag --Tourism Governer Only
export const createHistTag = async (req: Request, res: Response) => {
	try {
		const { name, type } = req.body;

		if (!name || !type)
			return res
				.status(400)
				.json({ message: "Misisng tag type or name" });

		const tag = new Tag({
			name,
			type,
		});

		await tag.save();

		res.status(200).send(tag);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
		console.log(error);
	}
};

//Retieve all historical location tags --Used in many things
export const getHistTags = async (req: Request, res: Response) => {
	try {
		const dataset = await Tag.find({ type: { $ne: "Preference" } });
		res.status(200).send(dataset);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
		console.log(error);
	}
};

//Creates a preferance tag --Admin only
export const createPrefTag = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;
		if (!name) {
			return res.status(400).json({ message: "Tag name missing" });
		}
		const type = "Preference";
		const tag = new Tag({
			name,
			type,
		});

		await tag.save();

		res.status(200).send(tag);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
		console.log(error);
	}
};

//Retieve all preference tags --Used in many things
export const getPrefTags = async (req: Request, res: Response) => {
	try {
		const dataset = await Tag.find({ type: "Preference" });
		res.status(200).send(dataset);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
		console.log(error);
	}
};

//Updates a preference tag --Admin only (not needed )
export const updatePrefTag = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { name } = req.body;

		//making sure I can only update and delete preference tags
		if (
			!Types.ObjectId.isValid(id) ||
			!(await Tag.find({ id, type: "Preference" }))
		) {
			return res.status(400).json({ message: "Invalid ID" });
		}

		if (!name) {
			return res.status(400).json({ message: "Tag name missing" });
		}

		const updatedTag = await Tag.findByIdAndUpdate(
			id,
			{ name, type: "Preference" },
			{ new: true },
		);

		res.status(200).json(updatedTag);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

//Delete a prefernece tag along with it's references in activities/itineraries
export const deletePreTag = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;

		//making sure I can only update and delete preference tags
		if (
			!Types.ObjectId.isValid(id) ||
			!(await Tag.find({ id, type: "Preference" }))
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

		//remove referenes first then delete the tag cuz of dependecies (not sure how they work, but just in case it matters, validations were already made)

		res.status(200).json({
			Deleted: updateSet.modifiedCount,
		});

		console.log("Deleted tag: ", tagDoc);
	} catch (error) {
		res.status(500).json({ messag: "Internal Server Error" });
	}
};
