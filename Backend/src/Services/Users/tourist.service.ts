import { ObjectId, Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
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

export const addBookedActivity = async (touristId: string, activityId: ObjectId) => {
	if (!Types.ObjectId.isValid(touristId)) {
		throw new HttpError(400, "Tourist id is not valid");
	}

	const tourist = await Tourist.findById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	tourist.bookedActivities.push(activityId);
	await tourist.save();
	return tourist;
};

export const addBookedItinerary = async (touristId: string, ItineraryId: ObjectId) => {
	if (!Types.ObjectId.isValid(touristId)) {
		throw new HttpError(400, "Tourist id is not valid");
	}

	const tourist = await Tourist.findById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	tourist.bookedItineraries.push(ItineraryId);
	await tourist.save();
	return tourist;
};

export const addBookedTransportation = async (touristId: string, transportationId: ObjectId) => {
	if (!Types.ObjectId.isValid(touristId)) {
		throw new HttpError(400, "Tourist id is not valid");
	}

	const tourist = await Tourist.findById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	tourist.bookedTransportations.push(transportationId);
	await tourist.save();
	return tourist;
};


export const cancelItinerary = async (touristId: string, itineraryId: ObjectId) => {
	if (!Types.ObjectId.isValid(touristId)) {
		throw new HttpError(400, "Tourist id is not valid");
	}

	const tourist = await Tourist.findById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	if (!tourist.bookedItineraries.includes(itineraryId)) {
		throw new HttpError(404, "Transportation not found in the tourist's list");
	}

	const removed = await tourist.updateOne({
		$pull: { itineraries: itineraryId }
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel transportation booking");
	}

	await tourist.save();

	return tourist;
};

export const cancelActivity = async (touristId: string, activityId: ObjectId) => {
	if (!Types.ObjectId.isValid(touristId)) {
		throw new HttpError(400, "Tourist id is not valid");
	}

	const tourist = await Tourist.findById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	if (!tourist.bookedActivities.includes(activityId)) {
		throw new HttpError(404, "Activity not found in the tourist's list");
	}

	const removed = await tourist.updateOne({
		$pull: { activitys: activityId }
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel activity booking");
	}

	await tourist.save();

	return tourist;
};

export const deleteTourist = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Id is Invalid and Required");
	}
	const tourist = await Tourist.findByIdAndDelete(id);

	return tourist;
};

export const getTouristsByUsername = async (username: string) => { };
