import { Request, Response } from "express";
import { Types } from "mongoose";

import { Review } from "../../Models/Interactions/review.model";
import { Product } from "../../Models/Purchases/product.model";
import { Activity } from "../../Models/Travel/activity.model";
import { IItinerary, Itinerary } from "../../Models/Travel/itinerary.model";
import { TourGuide } from "../../Models/Users/tourGuide.model";
import { Tourist } from "../../Models/Users/tourist.model";

export const postReview = async (req: Request, res: Response) => {
	const { text, reviewedItem, itemType, userId } = req.body;

	let { rating } = req.body;

	if (!rating) {
		rating = 0;
	}

	const tourist = await Tourist.findById(userId).populate<{
		bookedItineraries: IItinerary[];
	}>({
		path: "bookedItineraries",
		model: "Itinerary",
	});

	if (!tourist) {
		res.status(404).send("Tourist not found");
		return;
	}

	if (!reviewedItem || !itemType) {
		res.status(400).send("Missing required fields");
		return;
	}

	let reviewedItemEntry;
	switch (
		itemType //Switch statement to check conditions for each item type as well as load them
	) {
		case "Activity":
			reviewedItemEntry = await Activity.findById(reviewedItem);
			if (!reviewedItemEntry) {
				res.status(404).send("Activity not found");
				return;
			}
			if (
				!reviewedItemEntry.tourists.includes(
					new Types.ObjectId(userId),
				) ||
				reviewedItemEntry.dateTime > new Date()
			) {
				res.status(400).send(
					"Cannot rate an activity you have not attended",
				);
				return;
			}
			break;
		case "TourGuide":
			reviewedItemEntry = await TourGuide.findById(reviewedItem);
			if (!reviewedItemEntry) {
				res.status(404).send("Tour Guide not found");
				return;
			}
			let flag = false;
			//Check if any booked itineraries are with this tour guide and have ended
			for (let itinerary of tourist.bookedItineraries) {
				if (
					itinerary.createdBy.equals(reviewedItem) &&
					itinerary.endDateTime < new Date()
				) {
					flag = true;
					break;
				}
			}
			if (!flag) {
				res.status(400).send(
					"Cannot rate a tour guide you have not finished an itinerary with",
				);
				return;
			}
			break;
		case "Product":
			reviewedItemEntry = await Product.findById(reviewedItem);
			if (
				!reviewedItemEntry ||
				reviewedItemEntry.isDeleted ||
				reviewedItemEntry.isArchived
			) {
				res.status(404).send("Product not found");
				return;
			}

			if (
				!tourist.purchaseProducts.includes(
					new Types.ObjectId(reviewedItem),
				)
			) {
				res.status(400).send(
					"Cannot rate a product you have not purchased",
				);
				return;
			}
			break;
		case "Itinerary": //Fully tested
			reviewedItemEntry = await Itinerary.findById(reviewedItem);
			if (!reviewedItemEntry) {
				res.status(404).send("Itinerary not found");
				return;
			}

			if (
				!(
					reviewedItemEntry.endDateTime < new Date() &&
					reviewedItemEntry.tourists.includes(
						new Types.ObjectId(userId),
					)
				)
			) {
				{
					res.status(400).send(
						"Cannot rate an itinerary you have not attended or is still ongoing",
					);
					return;
				}
			}

			break;
		default:
			res.status(400).send("Invalid item type");
			return;
	}

	const reviewCount = reviewedItemEntry.totalNumberOfRatings;
	const oldAvgRating = reviewedItemEntry.avgRating;

	const reviewEntry = await Review.findOne({ tourist, reviewedItem });

	if (reviewEntry) {
		//If it is found, update
		const newAvgRating =
			(oldAvgRating * reviewCount - reviewEntry.rating + rating) /
			reviewCount;

		reviewedItemEntry.avgRating = newAvgRating;
		reviewEntry.rating = rating;
		if (text) {
			reviewEntry.text = text;
		} else {
			reviewEntry.text = "";
		}

		await reviewedItemEntry.save();
		await reviewEntry.save();

		res.status(200).json({
			Review: reviewEntry,
			"Reviewed Item": reviewedItemEntry,
		});
	} else {
		//If it is not found, create
		const newAvgRating =
			(oldAvgRating * reviewCount + rating) / (reviewCount + 1);

		reviewedItemEntry.avgRating = newAvgRating;
		reviewedItemEntry.totalNumberOfRatings = reviewCount + 1;
		await reviewedItemEntry.save();

		const review = await Review.create({
			rating,
			text,
			tourist,
			reviewedItem,
			itemType,
		});
		await review.save();

		res.status(201).json({
			Review: reviewEntry,
			"Reviewed Item": reviewedItemEntry,
		});
	}
};

export const listReviews = async (req: Request, res: Response) => {
	const { productId, activityId, itineraryId, tourGuideId, skipCount } =
		req.query;

	let reviews;

	console.log("Query: ", req.query);

	try {
		if (productId) {
			//Get product reviews
			reviews = await Review.find({
				reviewedItem: productId,
				itemType: "Product",
				text: { $ne: "" },
			})
				.populate("tourist")
				.skip(parseInt(skipCount as string) || 0)
				.limit(10);
		}

		if (activityId) {
			//Get activity reviews
			reviews = await Review.find({
				reviewedItem: activityId,
				itemType: "Activity",
				text: { $ne: "" },
			})
				.populate("tourist")
				.skip(parseInt(skipCount as string) || 0)
				.limit(10);
		}

		if (itineraryId) {
			//Get itinerary reviews
			reviews = await Review.find({
				reviewedItem: itineraryId,
				itemType: "Itinerary",
				text: { $ne: "" },
			})
				.populate("tourist")
				.skip(parseInt(skipCount as string) || 0)
				.limit(10);
		}

		if (tourGuideId) {
			//Get tour guide reviews
			reviews = await Review.find({
				reviewedItem: tourGuideId,
				itemType: "TourGuide",
				text: { $ne: "" },
			})
				.populate("tourist")
				.skip(parseInt(skipCount as string) || 0)
				.limit(10);
		}

		console.log("reviews: ", reviews);

		if (!reviews) {
			res.status(404).send("No reviews found");
			return;
		}

		res.status(200).send(reviews);
	} catch (error) {
		res.status(500).send("Internal Server Error");
		return;
	}
};
