import { NextFunction, Request, Response, response } from "express";
import { Types } from "mongoose";

import { TourGuideComment } from "../../Models/Interactions/Comments/TourGuide.Comment.Model";
import { TourGuideRate } from "../../Models/Interactions/Rates/TourGuide.Rate.model";
import { Itinerary } from "../../Models/Travel/itinerary.model";
import { TourGuide } from "../../Models/Users/tourGuide.model";
import { Tourist } from "../../Models/Users/tourist.model";

export const rateTourGuide = async (req: Request, res: Response) => {
	try {
		const { touristId, tourGuideId, value } = req.body;
		const tourist = await Tourist.findById(touristId);
		const tourGuide = await TourGuide.findById(tourGuideId);
		if (!tourist) {
			res.status(404).send("tourist not found");
			return;
		}
		if (!tourGuide) {
			res.status(404).send("tour guide not found");
			return;
		}
		const oldAverage = tourGuide.avgRating;
		const oldCount = tourGuide.totalNumberOfRatings;
		const itineraries = tourist.bookedItinerary;
		const currentDate = new Date();
		let interaction;

		for (let i = 0; i < itineraries.length; i++) {
			const itinerary = await Itinerary.findById(itineraries[i]);
			if (!itinerary) {
				res.status(400).send("tour not found");
				return;
			}
			if (
				itinerary.createdBy == tourGuideId &&
				itinerary.endDateTime < currentDate
			) {
				interaction = await TourGuideRate.create({
					touristId,
					tourGuideId,
					value,
				});
			}
			console.log(oldCount);
			console.log(oldAverage);
			console.log(interaction);
			const newAverage = (oldAverage * oldCount + value) / (oldCount + 1);
			await TourGuide.findByIdAndUpdate(
				tourGuideId,
				{
					totalNumberOfRatings: oldCount + 1,
					avgRating: newAverage,
				},
				{ new: true },
			);
		}
		res.status(201).send(interaction);
	} catch (error) {
		res.status(500).send(error);
	}
};
export const commentTourGuide = async (req: Request, res: Response) => {
	try {
		const { touristId, tourGuideId, text } = req.body;
		const tourist = await Tourist.findById(touristId);
		if (!tourist) {
			res.status(400).send("tourist not found");
			return;
		}
		const itineraries = tourist.bookedItinerary;
		const currentDate = new Date();
		let interaction;

		for (let i = 0; i < itineraries.length; i++) {
			const itinerary = await Itinerary.findById(itineraries[i]);
			if (!itinerary) {
				res.status(400).send("tour not found");
				return;
			}
			if (
				itinerary.createdBy == tourGuideId &&
				itinerary.endDateTime < currentDate
			) {
				interaction = await TourGuideComment.create({
					touristId,
					tourGuideId,
					text,
				});
			}
		}
		res.status(201).send(interaction);
	} catch (error) {
		res.status(400).send(error);
	}
};
