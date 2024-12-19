import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Activity } from "../../Models/Travel/activity.model";
import { Tag } from "../../Models/Travel/tag.model";
import * as tagService from "../../Services/Travel/tag.service";

//Creates a historical location tag --Tourism Governor Only
export const createHistTag = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { name, type } = req.body;

		if (!name || !type) {
			throw new HttpError(400, "Missing tag type or name");
		}

		const tag = await tagService.createHistTag(name, type);
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
		const data = await tagService.getHistTags();

		res.status(200).send(data);
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

		const tag = await tagService.createPrefTag(name);

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
		const data = await tagService.getPrefTags();
		res.status(200).send(data);
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

		if (!id) {
			throw new HttpError(400, "Tag id is required");
		}

		if (!name) {
			throw new HttpError(400, "Tag name missing");
		}

		const tag = tagService.updatePrefTag(id, name);

		if (!tag) {
			throw new HttpError(404, "Tag not found or not a preference tag");
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

		if (!id) {
			throw new HttpError(400, "Tag id is required");
		}

		const { tag, updateSet } = await tagService.deletePreTag(id);

		res.status(200).json({
			message: "Tag deleted",
			activities_affected: updateSet.modifiedCount,
		});
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
		const data = await tagService.getAllTags();
		res.status(200).send(data);
	} catch (error) {
		next(error);
	}
};
