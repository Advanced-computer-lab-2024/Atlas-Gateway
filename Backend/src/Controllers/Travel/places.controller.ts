import { NextFunction, Request, Response } from "express";
import mongoose, { PipelineStage, Types } from "mongoose";
import { userInfo } from "os";

import { Places } from "../../Models/Travel/places.model";
import { Governor } from "../../Models/Users/governor.model";
import AggregateBuilder from "../../Services/Operations/aggregation.service";

export const createPlace = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const governorId = req.headers.userid;

		if (!(await Governor.findById(governorId))) {
			return res
				.status(400)
				.json({ message: "Governor ID is invalid or doesn't exist" });
		}

		const placeData = new Places({
			...req?.body,
			governorId,
		});

		const response = await placeData.save();
		res.status(200).send(response);
	} catch (error) {
		next(error);
	}
};

export const getPlaces = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const pipeline: PipelineStage[] = [
			{
				$lookup: {
					from: "tags",
					localField: "tags",
					foreignField: "_id",
					as: "tags",
				},
			},

			...AggregateBuilder(req.query, ["name", "tagsData.name"]),
		];

		const result = await Places.aggregate(pipeline);

		if (result[0].data.length === 0) {
			return res
				.status(404)
				.json({ message: "No matching Places Found" });
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

export const getPlacesByUserId = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const governerId = req.headers.userid;
		if (!governerId) {
			return res.status(400).json({ message: "Governer ID is required" });
		}
		if (!Types.ObjectId.isValid(governerId.toString())) {
			return res.status(400).json({ message: "Invalid Governer ID" });
		}

		const pipeline: PipelineStage[] = [
			{
				$lookup: {
					from: "tags",
					localField: "tags",
					foreignField: "_id",
					as: "tags",
				},
			},
			{
				$match: {
					governorId: new Types.ObjectId(governerId.toString()),
				},
			},
			...AggregateBuilder(req.query, ["name", "tagsData.name"]),
		];

		const result = await Places.aggregate(pipeline);

		if (result[0].data.length === 0) {
			return res
				.status(404)
				.json({ message: "No matching Places Found" });
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

export const getPlaceById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: "Invalid Place ID" });
		}
		const response = await Places.findById(id).populate("tags");
		if (!response) {
			return res.status(404).json({ error: "Place not found" });
		}
		res.status(200).send(response);
	} catch (error) {
		next(error);
	}
};

export const updatePlace = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		const place = await Places.findById(id);
		if (!place) {
			return res.status(404).json({ message: "Place not found" });
		}

		place.set(req.body);

		await place.save();
		res.status(200).send(place);
	} catch (error) {
		next(error);
	}
};

export const deletePlace = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid Itinerary ID" });
		}

		const place = await Places.findById(id);
		if (!place) {
			return res.status(404).json({ message: "Itinerary not found" });
		}

		await Places.findByIdAndDelete(id);
		res.status(200).send("Itinerary deleted Successfully");
	} catch (error) {
		next(error);
	}
};
