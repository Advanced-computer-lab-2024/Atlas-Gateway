import { NextFunction, Request, Response, response } from "express";
import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { TouristInteraction } from "../../Models/Interactions/tourist.Interaction.model";
import { Itinerary } from "../../Models/Travel/itinerary.model";
import { TourGuide } from "../../Models/Users/tourGuide.model";
import { Tourist } from "../../Models/Users/tourist.model";

export const rateTourGuide = async (req: Request, res: Response) => {
	try {
		const { touristID, tourguideID, tourGuide_rating } = req.body;
		const tourist = await Tourist.findById(touristID);
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
				itinerary.createdBy == tourguideID &&
				itinerary.endDateTime < currentDate
			) {
				interaction = await TouristInteraction.create({
					touristID,
					tourguideID,
					tourGuide_rating,
				});
			}
		}
		res.status(201).send(interaction);
	} catch (error) {
		res.status(400).send(error);
	}
};
export const commentTourGuide = async (req: Request, res: Response) => {
	try {
		const { touristID, tourguideID, tourGuide_comment } = req.body;
		const tourist = await Tourist.findById(touristID);
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
				itinerary.createdBy == tourguideID &&
				itinerary.endDateTime < currentDate
			) {
				interaction = await TouristInteraction.create({
					touristID,
					tourguideID,
					tourGuide_comment,
				});
			}
		}
		res.status(201).send(interaction);
	} catch (error) {
		res.status(400).send(error);
	}
};
