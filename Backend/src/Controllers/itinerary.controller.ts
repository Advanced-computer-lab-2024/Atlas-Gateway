import { Request, Response } from "express";
import mongoose, { PipelineStage, Types } from "mongoose";

import { Itinerary } from "../Database/Models/itinerary.model";
import AggregateBuilder from "../Services/aggregation.service";

//Create a new product entry
export const createItinerary = async (req: Request, res: Response) => {
	try {
		const tourGuideId = req.headers.userid;

		if (!tourGuideId) {
			return res
				.status(400)
				.json({ message: "Tour Guide ID is required" });
		}

		if (!Types.ObjectId.isValid(tourGuideId.toString())) {
			return res.status(400).json({ message: "Invalid Tour Guide ID" });
		}

		const itineraryData = new Itinerary({
			...req.body,
			createdBy: new Types.ObjectId(tourGuideId.toString()),
		});

		await itineraryData.save();
		res.status(200).send(itineraryData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getItineraryById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: "Invalid Itinerary ID" });
		}

		const itinerary = await Itinerary.findById(id)
			.populate("tags")
			.populate("createdBy");

		res.status(200).send(itinerary);
	} catch (error) {
		res.status(500).send("Error getting Itinerary by id");
	}
};

export const getItinerary = async (req: Request, res: Response) => {
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
			// { TODO: Lookup the tourguide who created the itinerary
			// 	$lookup: {
			// 		from: "tourguides",
			// 		localField: "createdBy",
			// 		foreignField: "_id",
			// 		as: "createdBy",
			// 	},
			// },
			...AggregateBuilder(req.query, ["name", "tagsData.name"]),
		];

		const result = await Itinerary.aggregate(pipeline);

		const response = {
			data: result?.[0]?.data,
			metaData: {
				page: req.query.page || 1,
				total: result[0]?.total[0]?.count,
				pages: Math.ceil(
					(result[0]?.total[0]?.count ?? 0) /
						(Number(req?.query?.limit) || 10),
				),
			},
		};

		res.status(200).send(response);
	} catch (error) {
		res.status(500).send("Error getting Itinerary");
	}
};

export const updateItinerary = async (req: Request, res: Response) => {
	try {
		const itineraryId = req.params.id;

		const itinerary = await Itinerary.findByIdAndUpdate(
			itineraryId,
			{
				$set: req.body,
			},
			{ new: true },
		);

		res.status(200).send(itinerary);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const deleteItinerary = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid Itinerary ID" });
		}

		const itinerary = await Itinerary.findById(id);
		if (!itinerary) {
			return res.status(404).json({ message: "Itinerary not found" });
		}

		if (itinerary?.numberOfBookings > 0) {
			return res
				.status(404)
				.json({ message: "Itinerary is already booked" });
		}
		await Itinerary.findByIdAndDelete(id);
		res.status(200).send("Itinerary deleted Successfully");
	} catch (error) {
		console.log(error);
		res.status(500).send("Error deleting Itinerary");
	}
};
