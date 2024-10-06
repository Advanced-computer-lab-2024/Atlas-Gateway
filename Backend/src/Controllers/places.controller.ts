import { Request, Response } from "express";
import mongoose, { PipelineStage, Types } from "mongoose";

import { Governor } from "../Database/Models/Users/governor.model";
import { Places } from "../Database/Models/places.model";
import AggregateBuilder from "../Services/aggregation.service";

export const createPlace = async (req: Request, res: Response) => {
	try {
		const governorId = req.headers.userid;
		const {
			name,
			location,
			pictures,
			openingHours,
			description,
			ticketPrices,
			tags,
		} = req.body;
		if (!(await Governor.findById(governorId))) {
			return res
				.status(400)
				.json({ message: "Governor ID is invalid or doesn't exist" });
		}

		if (
			!name ||
			!location ||
			!pictures ||
			!openingHours ||
			!description ||
			!ticketPrices ||
			!tags
		) {
			return res.status(400).json({ message: "Missing Fields" });
		}
		const placeData = new Places({
			name,
			location,
			pictures,
			openingHours,
			description,
			ticketPrices,
			tags,
			governorId,
		});

		const response = await placeData.save();
		res.status(200).send(response);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
		console.log(error);
	}
};

export const getPlaces = async (req: Request, res: Response) => {
	try {
		const pipeline: PipelineStage[] = [
			{
				$lookup: {
					from: "tags",
					localField: "tags",
					foreignField: "_id",
					as: "tagsData",
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
		res.status(500).json({ message: "Internal Server Error" });
		console.log(error);
	}
};

export const getPlaceById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: "Invalid Place ID" });
		}
		const response = await Places.findById(id);
		res.status(200).send(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Place Not found" });
	}
};

export const updatePlace = async (req: Request, res: Response) => {
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
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
