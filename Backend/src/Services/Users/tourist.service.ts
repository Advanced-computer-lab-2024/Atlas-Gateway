import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Activity } from "../../Models/Travel/activity.model";
import { Itinerary } from "../../Models/Travel/itinerary.model";
import { Transportation } from "../../Models/Travel/transportation.model";
import { ITourist, Tourist } from "../../Models/Users/tourist.model";
import { hashPassword } from "../Auth/password.service";
import uniqueUsername from "../Auth/username.service";

export const createTourist = async (
	username: string,
	email: string,
	password: string,
	mobile: string,
	nationality: string,
	dob: Date,
	occupation: string,
) => {
	const resultUnique = await uniqueUsername(username);
	if (!resultUnique) {
		throw new HttpError(400, "Username Should Be Unique");
	}
	const hashedPassword = await hashPassword(password);

	const tourist = await Tourist.create({
		username: username,
		email: email,
		password: hashedPassword,
		mobile: mobile,
		nationality: nationality,
		dob: dob,
		occupation: occupation,
	});

	return tourist;
};

export const getTouristById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}
	const tourist = await Tourist.findById(id);
	return tourist;
};
export const getTourists = async () => {
	const tourists = await Tourist.find();
	return tourists;
};

export const updateTourist = async (id: string, newTourist: ITourist) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Tourist id is not valid");
	}

	const tourist = await Tourist.findByIdAndUpdate(id, newTourist, {
		new: true,
	});
	return tourist;
};

export const deleteTourist = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Id is Invalid and Required");
	}
	const tourist = await Tourist.findByIdAndDelete(id);

	return tourist;
};

function isOlderThan18(dob: Date): boolean {
	const today = new Date();

	let age = today.getFullYear() - dob.getFullYear();

	const monthDiff = today.getMonth() - dob.getMonth();
	const dayDiff = today.getDate() - dob.getDate();

	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age--;
	}

	return age >= 18;
}

export const addBookedActivity = async (
	touristId: string,
	activityId: Object,
) => {
	try {
		if (!Types.ObjectId.isValid(touristId)) {
			throw new HttpError(400, "Tourist id is not valid");
		}

		const tourist = await Tourist.findById(touristId);
		if (!tourist) {
			throw new HttpError(404, "Tourist not found");
		}

		if (!isOlderThan18(tourist.dob)) {
			throw new HttpError(400, "Tourist must be older than 18");
		}

		const activity = await Activity.findById(activityId);
		if (!activity) {
			throw new HttpError(404, "Activity not found");
		}

		tourist.bookedActivities.push(activity.id);

		await tourist.save();

		return tourist;
	} catch (error) {
		if (error instanceof HttpError) {
			throw error;
		} else {
			console.error("Unexpected error in addBookedActivity:", error);
			throw new HttpError(
				500,
				"An unexpected error occurred while adding booked activity",
			);
		}
	}
};

export const addBookedItinerary = async (
	touristId: string,
	itineraryId: string,
) => {
	try {
		if (!Types.ObjectId.isValid(touristId)) {
			throw new HttpError(400, "Tourist id is not valid");
		}

		const tourist = await Tourist.findById(touristId);
		if (!tourist) {
			throw new HttpError(404, "Tourist not found");
		}

		if (!isOlderThan18(tourist.dob)) {
			throw new HttpError(400, "Tourist must be older than 18");
		}

		const itinerary = await Itinerary.findById(itineraryId);
		if (!itinerary) {
			throw new HttpError(404, "Itinerary not found");
		}

		tourist.bookedItineraries.push(itinerary.id);
		await tourist.save();

		return tourist;
	} catch (error) {
		if (error instanceof HttpError) {
			throw error;
		} else {
			console.error("Unexpected error in addBookedItinerary:", error);
			throw new HttpError(
				500,
				"An unexpected error occurred while adding booked itinerary",
			);
		}
	}
};

export const addBookedTransportation = async (
	touristId: string,
	transportationId: string,
) => {
	try {
		if (!Types.ObjectId.isValid(touristId)) {
			throw new HttpError(400, "Tourist id is not valid");
		}

		const tourist = await Tourist.findById(touristId);
		if (!tourist) {
			throw new HttpError(404, "Tourist not found");
		}

		if (!isOlderThan18(tourist.dob)) {
			throw new HttpError(400, "Tourist must be older than 18");
		}

		const transportation = await Transportation.findById(transportationId);
		if (!transportation) {
			throw new HttpError(404, "Transportation not found");
		}

		tourist.bookedTransportations.push(transportation.id);

		await tourist.save();

		return tourist;
	} catch (error) {
		if (error instanceof HttpError) {
			throw error;
		} else {
			console.error("Unexpected error:", error);
			throw new HttpError(500, "An unexpected error occurred");
		}
	}
};

export const cancelItinerary = async (
	touristId: string,
	itineraryId: string,
) => {
	if (!Types.ObjectId.isValid(touristId)) {
		throw new HttpError(400, "Tourist id is not valid");
	}

	const tourist = await Tourist.findById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	const itinerary = await Itinerary.findById(itineraryId);

	if (!itinerary) {
		throw new HttpError(404, "Itinerary not found");
	}

	if (!tourist.bookedItineraries.includes(itinerary.id)) {
		throw new HttpError(
			404,
			"Transportation not found in the tourist's list",
		);
	}

	const removed = await tourist.updateOne({
		$pull: { itineraries: itineraryId },
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel transportation booking");
	}

	await tourist.save();

	return tourist;
};

export const cancelActivity = async (touristId: string, activityId: string) => {
	if (!Types.ObjectId.isValid(touristId)) {
		throw new HttpError(400, "Tourist id is not valid");
	}

	const tourist = await Tourist.findById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	const activity = await Activity.findById(activityId);

	if (!activity) {
		throw new HttpError(404, "Activity not found");
	}

	if (!tourist.bookedActivities.includes(activity.id)) {
		throw new HttpError(404, "Activity not found in the tourist's list");
	}

	const removed = await tourist.updateOne({
		$pull: { activitys: activityId },
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel activity booking");
	}

	await tourist.save();

	return tourist;
};

export const cancelTransportation = async (
	touristId: string,
	transportationId: string,
) => {
	if (!Types.ObjectId.isValid(touristId)) {
		throw new HttpError(400, "Tourist id is not valid");
	}

	const tourist = await Tourist.findById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	const transportation = await Transportation.findById(transportationId);

	if (!transportation) {
		throw new HttpError(404, "Transportation not found");
	}

	if (!tourist.bookedTransportations.includes(transportation.id)) {
		throw new HttpError(
			404,
			"Transportation not found in the tourist's list",
		);
	}

	const removed = await tourist.updateOne({
		$pull: { transportations: transportationId },
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel Transportation booking");
	}

	await tourist.save();

	return tourist;
};

export const getTouristsByUsername = async (username: string) => {};
