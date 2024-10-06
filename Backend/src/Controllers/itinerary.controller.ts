import { Request, Response } from "express";
import mongoose, { PipelineStage, Types } from "mongoose";

import { TourGuide } from "../Database/Models/Users/tourGuide.model";
import { Itinerary } from "../Database/Models/itinerary.model";
import { Product } from "../Database/Models/product.model";
import AggregateBuilder from "../Services/aggregation.service";
import { Console } from "console";

//Create a new product entry
export const createItinerary = async (req: Request, res: Response) => {
	try {
		const {
			title,
			language,
			price,
			availability,
			pickUpLocation,
			dropOffLocation,
			startDate,
			startTime,
			endDate,
			activities,
			tags,
		} = req.body;
		const tourGuideId  = req.headers.userid;
		//TODO: Check ID validity and existance
		if (
			!(await TourGuide.findById(tourGuideId))
		) {
			return res
				.status(400)
				.json({ message: "Tour Guide ID is invalid or doesn't exist" });
		}

		if (
			!title ||
			!language ||
			!price ||
			!availability ||
			!pickUpLocation ||
			!dropOffLocation ||
			!startDate ||
			!startTime ||
			!endDate ||
			!activities ||
			!tags
		) {
			return res.status(400).json({ message: "Misisng Fields" });
		}
		const itineraryData = new Itinerary({
			title,
			language,
			price,
			availability,
			pickUpLocation,
			dropOffLocation,
			startDate,
			startTime,
			endDate,
			activities,
			tags,
			createdBy: tourGuideId,
		});

		await itineraryData.save();
		res.status(200).send(itineraryData);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
		console.log(error);
	}
};

export const getItineraryById = async (req: Request, res: Response) => {
	try {
		const tourGuideId  = req.headers.userid;
		const id = req.params.id
		//TODO: Check ID validity and existance
		console.log(tourGuideId)
		if (
			!(await TourGuide.findById(tourGuideId))
		) {
			return res
				.status(400)
				.json({ message: "Tour Guide ID is invalid or doesn't exist" });
		}
		const itinerary = await Itinerary.findById(id);
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
					as: "tagsData",
				},
			},
			...AggregateBuilder(req.query, ["name", "tagsData.name"]),
		];

		const result = await Itinerary.aggregate(pipeline);

		if (result[0].data.length === 0) {
			return res
				.status(404)
				.json({ message: "No matching Itineraries Found" });
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
		res.status(500).send("Error getting Itinerary");
	}
};

export const updateItinerary = async (req: Request, res: Response) => {
	try {
		const {
			title,
			language,
			price,
			availability,
			pickUpLocation,
			dropOffLocation,
			startDate,
			startTime,
			endDate,
			activities,
			tags,
		} = req.body;
		const itineraryId = req.params.id;
		const tourGuideId  = req.headers.userid;
		//TODO: Check ID validity and existance
		if (
			!(await TourGuide.findById(tourGuideId))
		) {
			return res
				.status(400)
				.json({ message: "Tour Guide ID is invalid or doesn't exist" });
		}
		const itineraryData = new Itinerary({
			title,
			language,
			price,
			availability,
			pickUpLocation,
			dropOffLocation,
			startDate,
			startTime,
			endDate,
			activities,
			tags,
		});

		const temp = await Itinerary.findById(itineraryId);
		if (!temp) {
			return res.status(404).json({ message: "Itinerary not found" });
		}
		if (temp.createdBy.toString() !== tourGuideId) {
			return res
				.status(400)
				.json({ message: "TourGuideId Doesn't match the itinerary " });
		}

		res.status(200).send(itineraryData);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
		console.log(error);
	}
};

export const deleteItinerary = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const tourGuideId  = req.headers.userid;
		//TODO: Check ID validity and existance
		if (
			!(await TourGuide.findById(tourGuideId))
		) {
			return res
				.status(400)
				.json({ message: "Tour Guide ID is invalid or doesn't exist" });
		}
		const temp = await Itinerary.findById(id);
		if (!temp) {
			return res.status(404).json({ message: "Itinerary not found" });
		}
		if (temp.createdBy.toString() !== tourGuideId) {
			return res
				.status(400)
				.json({ message: "TourGuideId Doesn't match the itinerary " });
		}
		
		if (temp?.numberOfBookings > 0) {
			return res
				.status(404)
				.json({ message: "Itinerary is already booked" });
		}
		await Itinerary.findByIdAndDelete(id);
		res.status(200).send("Itinerary deleted Succefully");
	} catch (error) {
		console.log(error);
		res.status(500).send("Error deleting Itinerary");
	}
};
