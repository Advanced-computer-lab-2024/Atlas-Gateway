import { NextFunction, Request, Response, response } from "express";
import { Types } from "mongoose";

import { ItineraryComment } from "../../Models/Interactions/Comments/Itinerary.Comment.Model";
import { TourGuideComment } from "../../Models/Interactions/Comments/TourGuide.Comment.Model";
import { ItineraryRate } from "../../Models/Interactions/Rates/Itinerary.Rate.model";
import { TourGuideRate } from "../../Models/Interactions/Rates/TourGuide.Rate.model";
import { Product } from "../../Models/Purchases/product.model";
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
		let oldCount = tourGuide.totalNumberOfRatings;
		const itineraries = tourist.bookedItinerary;
		const currentDate = new Date();
		let interaction;
		let newAverage;

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
				interaction = await TourGuideRate.findOneAndUpdate(
					{ touristId, tourGuideId },
					{ $set: { value } },
					{ upsert: true, new: true },
				);
				if (interaction.isNew) {
					newAverage =
						(oldAverage * oldCount + value) / (oldCount + 1);
					oldCount = oldCount + 1;
				} else {
					newAverage = oldAverage * (oldCount - 1) + value / oldCount;
				}
			}
			await TourGuide.findByIdAndUpdate(
				tourGuideId,
				{
					totalNumberOfRatings: oldCount,
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
////TODO: possibly add an attribute in the tourist that shows that he purchased the product or implement the order api in sprint 3
// export const rateProduct = async (req: Request, res: Response) => {
// 	try {
// 		const { touristId, productId, value } = req.body;
// 		const tourist = await Tourist.findById(touristId);
// 		const product = await Product.findById(productId);
// 		if (!tourist) {
// 			res.status(404).send("tourist not found");
// 			return;
// 		}
// 		if (!product) {
// 			res.status(404).send("tour guide not found");
// 			return;
// 		}
// 		const oldAverage = product.avgRating;
// 		let oldCount = product.totalNumberOfRatings;
// 		const itineraries = tourist.bookedItinerary;
// 		const currentDate = new Date();
// 		let interaction;
// 		let newAverage;

// 		for (let i = 0; i < itineraries.length; i++) {
// 			const itinerary = await Itinerary.findById(itineraries[i]);
// 			if (!itinerary) {
// 				res.status(400).send("tour not found");
// 				return;
// 			}
// 			if (
// 				itinerary.createdBy == productId &&
// 				itinerary.endDateTime < currentDate
// 			) {
// 				interaction = await TourGuideRate.findOneAndUpdate(
// 					{ touristId, productId },
// 					{ $set: { value } },
// 					{ upsert: true, new: true },
// 				);
// 				if (interaction.isNew) {
// 					newAverage =
// 						(oldAverage * oldCount + value) / (oldCount + 1);
// 					oldCount = oldCount + 1;
// 				} else {
// 					newAverage = oldAverage * (oldCount - 1) + value / oldCount;
// 				}
// 			}
// 			await TourGuide.findByIdAndUpdate(
// 				productId,
// 				{
// 					totalNumberOfRatings: oldCount,
// 					avgRating: newAverage,
// 				},
// 				{ new: true },
// 			);
// 		}
// 		res.status(201).send(interaction);
// 	} catch (error) {
// 		res.status(500).send(error);
// 	}
// };
export const rateItinerary = async (req: Request, res: Response) => {
	try {
		const { touristId, itineraryId, value } = req.body;
		const tourist = await Tourist.findById(touristId);
		const itinerary = await Itinerary.findById(itineraryId);
		if (!tourist) {
			res.status(404).send("tourist not found");
			return;
		}
		if (!itinerary) {
			res.status(404).send("Event not found");
			return;
		}
		const oldAverage = itinerary.avgRating;
		let oldCount = itinerary.totalNumberOfRatings;
		const itineraries = tourist.bookedItinerary;
		const currentDate = new Date();
		let interaction;
		let newAverage;
		if (itineraries.includes(itineraryId)) {
			const itinerary = await Itinerary.findById(itineraryId);
			if (!itinerary) {
				res.status(400).send("the itinerary passed isnt found");
				return;
			}
			if (itinerary.endDateTime < currentDate) {
				interaction = await ItineraryRate.findOneAndUpdate(
					{ touristId, itineraryId },
					{ $set: { value } },
					{ upsert: true, new: true },
				);
				if (interaction.isNew) {
					newAverage =
						(oldAverage * oldCount + value) / (oldCount + 1);
					oldCount = oldCount + 1;
				} else {
					newAverage = oldAverage * (oldCount - 1) + value / oldCount;
				}
				await Itinerary.findByIdAndUpdate(
					itineraryId,
					{
						totalNumberOfRatings: oldCount,
						avgRating: newAverage,
					},
					{ new: true },
				);
				res.status(201).send(interaction);
			} else {
				res.status(400).send("Event hasnt started yet");
			}
		} else {
			res.status(400).send("Event isnt booked by Tourist");
			console.log(itineraries);
			console.log(itineraryId);
		}

		// for (let i = 0; i < itineraries.length; i++) {
		// 	const itinerary = await Itinerary.findById(itineraries[i]);
		// 	if (!itinerary) {
		// 		res.status(400).send("Itinerary not found booked by tourist");
		// 		return;
		// 	}
		// 	if (
		// 		itinerary.id == itineraryId &&
		// 		itinerary.endDateTime < currentDate
		// 	) {
		// 		interaction = await ItineraryRate.findOneAndUpdate(
		// 			{ touristId, itineraryId },
		// 			{ $set: { value } },
		// 			{ upsert: true, new: true },
		// 		);
		// 		console.log(interaction);
		// 		console.log("hello");
		// 		if (interaction.isNew) {
		// 			newAverage =
		// 				(oldAverage * oldCount + value) / (oldCount + 1);
		// 			oldCount = oldCount + 1;
		// 		} else {
		// 			newAverage = oldAverage * (oldCount - 1) + value / oldCount;
		// 		}
		// 	} else {
		// 		res.status(400).send("Event hasnt started yet");
		// 	}
	} catch (error) {
		res.status(500).send(error);
	}
};
export const commentItinerary = async (req: Request, res: Response) => {
	try {
		const { touristId, itineraryId, text } = req.body;
		const tourist = await Tourist.findById(touristId);
		const itinerary = await Itinerary.findById(itineraryId);
		if (!tourist) {
			res.status(400).send("tourist not found");
			return;
		}
		if (!itinerary) {
			res.status(400).send("Event not found");
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
				itinerary.id == itineraryId &&
				itinerary.endDateTime < currentDate
			) {
				interaction = await ItineraryComment.create({
					touristId,
					itineraryId,
					text,
				});
			}
		}
		res.status(201).send(interaction);
	} catch (error) {
		res.status(400).send(error);
	}
};
