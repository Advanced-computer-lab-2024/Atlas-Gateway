import { NextFunction, Request, Response, response } from "express";
import { Types } from "mongoose";

import { ActivityComment } from "../../Models/Interactions/Comments/Activity.Comment";
import { ItineraryComment } from "../../Models/Interactions/Comments/Itinerary.Comment.Model";
import { TourGuideComment } from "../../Models/Interactions/Comments/TourGuide.Comment.Model";
import { ActivityRate } from "../../Models/Interactions/Rates/Activity.Rate.Model";
import { ItineraryRate } from "../../Models/Interactions/Rates/Itinerary.Rate.model";
import { ProductRate } from "../../Models/Interactions/Rates/Product.Rate.model";
import { TourGuideRate } from "../../Models/Interactions/Rates/TourGuide.Rate.model";
import { Product } from "../../Models/Purchases/product.model";
import { Activity } from "../../Models/Travel/activity.model";
import { Itinerary } from "../../Models/Travel/itinerary.model";
import { TourGuide } from "../../Models/Users/tourGuide.model";
import { Tourist } from "../../Models/Users/tourist.model";

export const rateTourGuide = async (req: Request, res: Response) => {
	try {
		const { touristId, tourGuideId, value } = req.body;
		const tourist = await Tourist.findById(touristId); //TODO: populate the whole attributes of itineraries
		let tourGuide = await TourGuide.findById(tourGuideId);
		if (!tourist) {
			res.status(404).send("tourist not found");
			return;
		}
		if (!tourGuide) {
			res.status(404).send("tour guide not found");
			return;
		}
		const oldAverage = tourGuide.avgRating;
		let count = tourGuide.totalNumberOfRatings;
		const itineraries = tourist.bookedItineraries; //TODO: handle properly sprint 3
		const currentDate = new Date();
		let interaction;
		let newAverage;

		for (let i = 0; i < itineraries.length; i++) {
			const itinerary = await Itinerary.findById(itineraries[i]);
			if (!itinerary) {
				res.status(400).send("tour not found");
				return;
			}
			console.log(itinerary.endDateTime < currentDate);
			if (
				itinerary.createdBy == tourGuideId &&
				itinerary.endDateTime < currentDate
			) {
				interaction = await TourGuideRate.findOne({
					touristId,
					tourGuideId,
				});
				if (!interaction) {
					interaction = await TourGuideRate.create({
						touristId,
						tourGuideId,
						value,
					});
					console.log("insert");
					newAverage = (oldAverage * count + value) / (count + 1);
					console.log(newAverage);
					count = count + 1;
					console.log(count);
				} else {
					let oldRating = interaction.value;
					await TourGuideRate.updateOne(
						{ touristId, tourGuideId },
						{ $set: { value } },
					);
					console.log("update");
					console.log(oldAverage);
					console.log(count);
					console.log(oldRating);
					console.log(value);
					newAverage =
						(oldAverage * count - oldRating + value) / count;
					console.log(newAverage);
				}
				break;
			}
		}
		if (!interaction) {
			res.status(400).send("cannot rate");
			return;
		}
		tourGuide = await TourGuide.findByIdAndUpdate(
			tourGuideId,
			{
				totalNumberOfRatings: count,
				avgRating: newAverage,
			},
			{ new: true },
		);
		res.status(201).json({
			interaction: interaction,
			tourguide: tourGuide,
		});
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
		const itineraries = tourist.bookedItineraries;
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
export const rateProduct = async (req: Request, res: Response) => {
	try {
		const { touristId, productId, value } = req.body;
		const tourist = await Tourist.findById(touristId);
		let product = await Product.findById(productId);
		if (!tourist) {
			res.status(404).send("tourist not found");
			return;
		}
		if (!product) {
			res.status(404).send("product not found");
			return;
		}
		const oldAverage = product.avgRating;
		let count = product.totalNumberOfRatings;
		const purchaseProducts = tourist.purchaseProducts;
		let interaction = await ProductRate.findOne({ touristId, productId });
		let newAverage;
		if (purchaseProducts.includes(productId)) {
			if (!interaction) {
				interaction = await ProductRate.create({
					touristId,
					productId,
					value,
				});
				console.log("insert");
				newAverage = (oldAverage * count + value) / (count + 1);
				console.log(newAverage);
				count = count + 1;
				console.log(count);
			} else {
				let oldRating = interaction.value;
				await ProductRate.updateOne(
					{ touristId, productId },
					{ $set: { value } },
				);
				console.log("update");
				console.log(oldAverage);
				console.log(count);
				console.log(oldRating);
				console.log(value);
				newAverage = (oldAverage * count - oldRating + value) / count;
				console.log(newAverage);
			}
		}
		if (!interaction) {
			res.status(400).send("cannot rate");
			return;
		}
		product = await Product.findByIdAndUpdate(
			product,
			{
				totalNumberOfRatings: count,
				avgRating: newAverage,
			},
			{ new: true },
		);
		res.status(201).json({
			interaction: interaction,
			product: product,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};
export const reviewProduct = async (req: Request, res: Response) => {
	try {
		const { touristId, productId, value, text } = req.body;
		const tourist = await Tourist.findById(touristId);
		let product = await Product.findById(productId);
		if (!tourist) {
			res.status(404).send("tourist not found");
			return;
		}
		if (!product) {
			res.status(404).send("product not found");
			return;
		}
		const oldAverage = product.avgRating;
		let count = product.totalNumberOfRatings;
		const purchaseProducts = tourist.purchaseProducts;
		let interaction = await ProductRate.findOne({ touristId, productId });
		let newAverage;
		if (purchaseProducts.includes(productId)) {
			if (!interaction) {
				interaction = await ProductRate.create({
					touristId,
					productId,
					value,
					text,
				});
				console.log("insert");
				newAverage = (oldAverage * count + value) / (count + 1);
				console.log(newAverage);
				count = count + 1;
				console.log(count);
			} else {
				let oldRating = interaction.value;
				await ProductRate.updateOne(
					{ touristId, productId },
					{ $set: { value: value, text: text } },
				);
				console.log("update");
				console.log(oldAverage);
				console.log(count);
				console.log(oldRating);
				console.log(value);
				newAverage = (oldAverage * count - oldRating + value) / count;
				console.log(newAverage);
			}
		}
		if (!interaction) {
			res.status(400).send("cannot rate");
			return;
		}
		product = await Product.findByIdAndUpdate(
			product,
			{
				totalNumberOfRatings: count,
				avgRating: newAverage,
			},
			{ new: true },
		);
		res.status(201).json({
			interaction: interaction,
			product: product,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};

export const rateItinerary = async (req: Request, res: Response) => {
	try {
		const { touristId, itineraryId, value } = req.body;
		const tourist = await Tourist.findById(touristId);
		let itinerary = await Itinerary.findById(itineraryId);
		if (!tourist) {
			res.status(404).send("tourist not found");
			return;
		}
		if (!itinerary) {
			res.status(404).send("Event not found");
			return;
		}
		const oldAverage = itinerary.avgRating;
		let count = itinerary.totalNumberOfRatings;
		const itineraries = tourist.bookedItineraries;
		const currentDate = new Date();
		let interaction = await ItineraryRate.findOne({
			touristId,
			itineraryId,
		});
		let newAverage;

		if (itineraries.includes(itineraryId)) {
			if (itinerary.endDateTime < currentDate) {
				if (!interaction) {
					interaction = await ItineraryRate.create({
						touristId,
						itineraryId,
						value,
					});
					console.log("insert");
					newAverage = (oldAverage * count + value) / (count + 1);
					console.log(newAverage);
					count = count + 1;
					console.log(count);
				} else {
					let oldRating = interaction.value;
					await ItineraryRate.updateOne(
						{ touristId, itineraryId },
						{ $set: { value } },
					);
					console.log("update");
					console.log(oldAverage);
					console.log(count);
					console.log(oldRating);
					console.log(value);
					newAverage =
						(oldAverage * count - oldRating + value) / count;
					console.log(newAverage);
				}
			} else {
				res.status(400).send(
					"cannot rate Itinerary date hasnt passed yet",
				);
			}
		}
		if (!interaction) {
			res.status(400).send("cannot rate");
			return;
		}
		itinerary = await Itinerary.findByIdAndUpdate(
			itineraryId,
			{
				totalNumberOfRatings: count,
				avgRating: newAverage,
			},
			{ new: true },
		);
		res.status(201).json({
			interaction: interaction,
			itinerary: itinerary,
		});
	} catch (error) {
		res.status(500).send(error);
		console.log(error);
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
		const itineraries = tourist.bookedItineraries;
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
export const rateActivity = async (req: Request, res: Response) => {
	try {
		const { touristId, activityId, value } = req.body;
		const tourist = await Tourist.findById(touristId);
		let activity = await Activity.findById(activityId);
		if (!tourist) {
			res.status(404).send("tourist not found");
			return;
		}
		if (!activity) {
			res.status(404).send("activity not found");
			return;
		}
		const oldAverage = activity.avgRating;
		let count = activity.totalNumberOfRatings;
		const activities = tourist.bookedActivities;
		const currentDate = new Date();
		let interaction = await ActivityRate.findOne({ touristId, activityId });
		let newAverage;
		if (activities.includes(activityId)) {
			if (activity.dateTime < currentDate) {
				if (!interaction) {
					interaction = await ActivityRate.create({
						touristId,
						activityId,
						value,
					});
					console.log("insert");
					newAverage = (oldAverage * count + value) / (count + 1);
					console.log(newAverage);
					count = count + 1;
					console.log(count);
				} else {
					let oldRating = interaction.value;
					await ItineraryRate.updateOne(
						{ touristId, activityId },
						{ $set: { value } },
					);
					console.log("update");
					console.log(oldAverage);
					console.log(count);
					console.log(oldRating);
					console.log(value);
					newAverage =
						(oldAverage * count - oldRating + value) / count;
					console.log(newAverage);
				}
			} else {
				res.status(400).send(
					"activity date hasnt passed yet cannot rate",
				);
			}
		} else {
			res.status(400).send("activity isnt booked by user");
		}
		activity = await Activity.findByIdAndUpdate(
			activityId,
			{
				totalNumberOfRatings: count,
				avgRating: newAverage,
			},
			{ new: true },
		);
		res.status(201).json({
			interaction: interaction,
			activity: activity,
		});
	} catch (error) {
		res.status(500).send("error");
		console.log(error);
	}
};
export const commentActivity = async (req: Request, res: Response) => {
	try {
		const { touristId, activityId, text } = req.body;
		const tourist = await Tourist.findById(touristId);
		const activity = await Activity.findById(activityId);
		if (!tourist) {
			res.status(400).send("tourist not found");
			return;
		}
		if (!activity) {
			res.status(400).send("Event not found");
			return;
		}
		const activities = tourist.bookedActivities;
		const currentDate = new Date();
		let interaction;
		if (activities.includes(activityId)) {
			if (activity.dateTime < currentDate) {
				interaction = await ActivityComment.create({
					touristId,
					activityId,
					text,
				});
			} else {
				res.status(400).send("activity date hasnt come yet");
			}
		} else {
			res.status(400).send("activity isnt booked by user");
		}
		res.status(201).send(interaction);
	} catch (error) {
		res.status(400).send(error);
	}
};
