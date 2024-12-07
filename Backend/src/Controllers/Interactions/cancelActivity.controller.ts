import { Request, Response } from "express";

import { Activity } from "../../Models/Travel/activity.model";
import { Itinerary } from "../../Models/Travel/itinerary.model";
import { Tourist } from "../../Models/Users/tourist.model";

export const cancelActivity = async (res: Response, req: Request) => {
	const activityId = req.body;
	const touristId = req.body;
	const activity = await Activity.findById(activityId);
	const tourist = await Tourist.findById(touristId);
	if (!activity) {
		res.status(404).send("activity not found");
	}
	if (!tourist) {
		res.status(404).send("Tourist not found");
	}
	const bookedActivities = tourist?.bookedActivities;
	const walletBalance = tourist?.walletBalance;
	bookedActivities?.filter((activty) => activty.id != activityId);
};
export const cancelItinerary = async (res: Response, req: Request) => {
	const itineraryId = req.body;
	const touristId = req.body;
	try {
		const itinerary = await Itinerary.findById(itineraryId);
		const tourist = await Tourist.findById(touristId);
		if (!itinerary) {
			res.status(404).send("Itinerary not found");
		}
		if (!tourist) {
			res.status(404).send("Tourist not found");
		}
		let bookedItineraries = tourist?.bookedItineraries || [];
		let walletBalance = tourist?.walletBalance || 0;
		console.log(walletBalance);
		console.log(bookedItineraries);
		bookedItineraries?.filter((itinerary) => itinerary.id != itineraryId);
		walletBalance += itinerary?.price || 0;
		console.log(walletBalance);
		console.log(bookedItineraries);

		await Tourist.findByIdAndUpdate(touristId, {
			bookedItineraries,
			walletBalance,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};
