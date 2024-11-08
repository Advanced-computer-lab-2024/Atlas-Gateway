import mongoose, { PipelineStage, Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { IItinerary, Itinerary } from "../../Models/Travel/itinerary.model";
import AggregateBuilder from "../Operations/aggregation.service";
import { cancelItinerary } from "../Users/tourist.service";
import * as tourGuideService from "./../Users/tourGuide.service";
import * as touristService from "./../Users/tourist.service";

export const createItinerary = async (
	itinerary: IItinerary,
	createdBy: string,
) => {
	const session = await mongoose.startSession();
	try {
		if (!Types.ObjectId.isValid(createdBy)) {
			throw new HttpError(400, "Invalid Tour Guide ID");
		}

		session.startTransaction();

		// Link itinerary ID to the tour guide's itinerary array
		const tourGuide = await tourGuideService.getTourGuideById(createdBy);

		if (!tourGuide) {
			throw new HttpError(404, "Tour Guide not found");
		}

		const itineraryData = new Itinerary({
			itinerary,
			createdBy: new Types.ObjectId(createdBy),
		});

		await itineraryData.save({ session }); // Save to generate the ID

		await tourGuide.updateOne(
			{ $push: { itinerary: itineraryData.id } }, // Update data

			{ session },
		);
		await session.commitTransaction();

		return itineraryData;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

export const getItineraryById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid Itinerary ID");
	}

	const itinerary = await Itinerary.findById(id)
		.populate("tags")
		.populate("createdBy");

	if (!itinerary) {
		throw new HttpError(404, "Itinerary not Found");
	}

	return itinerary;
};

export const getItineraryByUserId = async (userId: string, query: any) => {
	if (!Types.ObjectId.isValid(userId)) {
		throw new HttpError(400, "Invalid Tour Guide ID");
	}

	const pipeline: PipelineStage[] = [
		{
			$lookup: {
				from: "tags",
				localField: "tags",
				foreignField: "_id",
				as: "tags",
			},
		},
		{
			$match: {
				createdBy: new Types.ObjectId(userId),
			},
		},
		...AggregateBuilder(query, ["title", "tags.name"]),
	];

	const result = await Itinerary.aggregate(pipeline);

	if (result[0].data.length === 0) {
		throw new HttpError(404, "No itineraries Found");
	}

	return result;
};

export const getItineraries = async (query: any) => {
	const pipeline: PipelineStage[] = [
		{
			$lookup: {
				from: "tags",
				localField: "tags",
				foreignField: "_id",
				as: "tags",
			},
		},
		...AggregateBuilder(query, ["title", "tags.name"]),
	];

	const result = await Itinerary.aggregate(pipeline);

	if (result[0].data.length === 0) {
		throw new HttpError(404, "No itineraries Found");
	}

	return result;
};

export const updateItinerary = async (id: string, newItinerary: IItinerary) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const itinerary = await Itinerary.findByIdAndUpdate(id, newItinerary, {
		new: true,
	});

	return itinerary;
};

export const deleteItinerary = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid Itinerary ID");
	}

	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		// Find the itinerary to check its details
		const itinerary = await Itinerary.findById(id).session(session);
		if (!itinerary) {
			throw new HttpError(404, "Itinerary not found");
		}

		// Check if the itinerary has any bookings
		if (itinerary.numberOfBookings > 0) {
			throw new HttpError(400, "Itinerary is already booked");
		}

		// Find the associated TourGuide document
		const tourGuideId = itinerary.createdBy; // Assuming createdBy is the TourGuide ID
		const tourGuide = await tourGuideService.getTourGuideById(
			tourGuideId.toString(),
		);
		if (!tourGuide) {
			throw new HttpError(404, "Tour Guide not found");
		}

		//Remove the itinerary ID from the tour guide's itineraries array
		tourGuide.itinerary = tourGuide.itinerary.filter(
			(itineraryId) => !itineraryId.equals(id),
		);
		await tourGuide.updateOne({ session });
		// Delete the itinerary
		await itinerary.deleteOne({ session });

		await session.commitTransaction();

		return itinerary;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

export const bookItinerary = async (itineraryId: string, touristId: string) => {
	const itinerary = await getItineraryById(itineraryId);
	if (!itinerary) {
		throw new HttpError(404, "Itinerary not found");
	}

	if (itinerary.availability <= itinerary.numberOfBookings) {
		throw new HttpError(500, "Itinerary is fully booked");
	}

	const tourist = await touristService.addBookedItinerary(
		touristId,
		itineraryId,
	);

	await itinerary.updateOne({
		$push: { tourists: touristId },
		$inc: { numberOfBookings: 1 },
	});

	return itinerary;
};

export const cancelBookingItinerary = async (
	itineraryId: string,
	touristId: string,
) => {
	const itinerary = await getItineraryById(itineraryId);
	if (!itinerary) {
		throw new HttpError(404, "Itinerary not found");
	}

	const currentDate = new Date();
	const millisecondsBeforeItinerary =
		itinerary.startDateTime.getTime() - currentDate.getTime();
	const hoursBeforeItinerary = millisecondsBeforeItinerary / (1000 * 3600);
	if (hoursBeforeItinerary < 48) {
		throw new HttpError(400, "Cannot cancel within 48 hours of itinerary.");
	}

	if (!itinerary.tourists.includes(new Types.ObjectId(touristId))) {
		throw new HttpError(404, "Itinerary not found in the tourist's list");
	}

	const removed = await itinerary.updateOne({
		$pull: { tourists: touristId },
		$inc: { numberOfBookings: -1 },
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel itinerary booking");
	}

	const tourist = await touristService.cancelItinerary(
		touristId,
		itineraryId,
	);

	return itinerary;
};

export const softDeleteItinerary = async (id: string) => {
	const itinerary = await getItineraryById(id);

	if (!itinerary) {
		throw new HttpError(404, "Itinerary not found");
	}

	const itineraryDeleted = await Itinerary.findByIdAndUpdate(
		id,
		{ isDeleted: true },
		{ new: true },
	);

	return itineraryDeleted;
};
