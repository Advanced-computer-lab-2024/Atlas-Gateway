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
			return res.status(400).json({ message: "Misisng Fields" });
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
		const response = await Places.find();

		res.status(200).send(response);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
		console.log(error);
	}
};

export const getPlaceById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const response = await Places.findById(id);
		res.status(200).send(response);
	} catch (error) {
		res.status(500).json({ message: "Place Not found" });
		console.log(error);
	}
};
//TO-DO: Update Places, Delete Places
