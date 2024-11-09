import { Product } from "@/Models/Purchases/product.model";
import { Activity } from "@/Models/Travel/activity.model";
import { Itinerary } from "@/Models/Travel/itinerary.model";
import { TourGuide } from "@/Models/Users/tourGuide.model";
import { Tourist } from "@/Models/Users/tourist.model";
import { Request, Response } from "express";

import { Review } from "../../Models/Interactions/review.model";

export const postReview = async (req: Request, res: Response) => {
	const { rating, text, reviewedItem, itemType } = req.body;
	const touristId = req.headers.userid;

	const tourist = await Tourist.findById(touristId); //TODO: populate the whole attributes of itineraries
	if (!tourist) {
		res.status(404).send("Tourist not found");
		return;
	}

	let reviewedItemEntry;
	switch (itemType) {
		case "Activity":
			reviewedItemEntry = await Activity.findById(reviewedItem);
			if (
				!reviewedItemEntry ||
				!(
					tourist.bookedActivities.includes(reviewedItem) &&
					reviewedItemEntry.tourists.includes(touristId)
				)
			) {
				res.status(404).send("Activity not found");
				return;
			}
			break;
		case "TourGuide":
			reviewedItemEntry = await TourGuide.findById(reviewedItem);
			if (!reviewedItemEntry) {
				res.status(404).send("Tour Guide not found");
				return;
			}
			break;
		case "Product":
			reviewedItemEntry = await Product.findById(reviewedItem);
			if (!reviewedItemEntry) {
				res.status(404).send("Product not found");
				return;
			}
			break;
		case "Itinerary":
			reviewedItemEntry = await Itinerary.findById(reviewedItem);
			if (!reviewedItemEntry) {
				res.status(404).send("Itinerary not found");
				return;
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

		await reviewedItemEntry.save();
		await reviewEntry.save();
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
	}
};
