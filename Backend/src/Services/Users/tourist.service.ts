import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { ITourist, Tourist } from "../../Models/Users/tourist.model";
import { hashPassword } from "../Auth/password.service";
import uniqueUsername from "../Auth/username.service";
import * as activityService from "../Travel/activity.service";
import * as itineraryService from "../Travel/itinerary.service";
import * as transportationService from "../Travel/transportation.service";

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

export const addBookedActivity = async (
	touristId: string,
	activityId: string,
) => {
	if (!Types.ObjectId.isValid(activityId)) {
		throw new HttpError(400, "Activity id is not valid");
	}

	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	if (!isOlderThan18(tourist.dob)) {
		throw new HttpError(400, "Tourist must be older than 18");
	}

	await tourist.updateOne({
		$push: { bookedActivities: activityId },
	});

	return tourist;
};
export function isOlderThan18(dob: Date): boolean {
	const today = new Date();

	let age = today.getFullYear() - dob.getFullYear();

	const monthDiff = today.getMonth() - dob.getMonth();
	const dayDiff = today.getDate() - dob.getDate();

	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age--;
	}

	return age >= 18;
}

export const addBookedItinerary = async (
	touristId: string,
	itineraryId: string,
) => {
	if (!Types.ObjectId.isValid(itineraryId)) {
		throw new HttpError(400, "Itinerary id is not valid");
	}

	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	if (!isOlderThan18(tourist.dob)) {
		throw new HttpError(400, "Tourist must be older than 18");
	}
	await tourist.updateOne(
		{
			$push: { bookedItineraries: itineraryId },
		},
		{ new: true },
	);

	return tourist;
};

export const addBookedTransportation = async (
	touristId: string,
	transportationId: string,
) => {
	if (!Types.ObjectId.isValid(transportationId)) {
		throw new HttpError(400, "Transportation id is not valid");
	}

	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	if (!isOlderThan18(tourist.dob)) {
		throw new HttpError(400, "Tourist must be older than 18");
	}

	await tourist.updateOne(
		{
			$push: { bookedTransportations: transportationId },
		},
		{ new: true },
	);

	return tourist;
};

export const cancelItinerary = async (
	touristId: string,
	itineraryId: string,
) => {
	if (!Types.ObjectId.isValid(itineraryId)) {
		throw new HttpError(400, "Itinerary id is not valid");
	}
	if (!Types.ObjectId.isValid(touristId)) {
		throw new HttpError(400, "Tourist id is not valid");
	}
	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	if (!tourist.bookedItineraries.includes(new Types.ObjectId(itineraryId))) {
		throw new HttpError(404, "Itinerary not found in the tourist's list");
	}

	const removed = await tourist.updateOne({
		$pull: { bookedItineraries: itineraryId },
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel transportation booking");
	}

	return tourist;
};

export const cancelActivity = async (touristId: string, activityId: string) => {
	if (!Types.ObjectId.isValid(activityId)) {
		throw new HttpError(400, "Activity id is not valid");
	}

	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	if (!tourist.bookedActivities.includes(new Types.ObjectId(activityId))) {
		throw new HttpError(404, "Activity not found in the tourist's list");
	}

	const removed = await tourist.updateOne({
		$pull: { bookedActivities: activityId },
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel activity booking");
	}

	return tourist;
};

export const cancelTransportation = async (
	touristId: string,
	transportationId: string,
) => {
	if (!Types.ObjectId.isValid(transportationId)) {
		throw new HttpError(400, "Transportation id is not valid");
	}
	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	if (
		!tourist.bookedTransportations.includes(
			new Types.ObjectId(transportationId),
		)
	) {
		throw new HttpError(
			404,
			"Transportation not found in the tourist's list",
		);
	}

	const removed = await tourist.updateOne({
		$pull: { bookedTransportations: transportationId },
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel Transportation booking");
	}

	return tourist;
};

/*
 * Soft delete tourist and unbook all activities, itineraries and transportation
 * @param id
 * @throws {HttpError}
 * @returns {Promise<ITourist>}
 */

export const softDeleteTourist = async (id: string) => {
	const tourist = await getTouristById(id);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	await tourist.updateOne({ isDeleted: true });

	return tourist;
};
