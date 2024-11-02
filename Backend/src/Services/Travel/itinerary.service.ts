import mongoose, { PipelineStage, Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { IItinerary, Itinerary } from "../../Models/Travel/itinerary.model";
import AggregateBuilder from "../Operations/aggregation.service";
import * as tourGuideService from "./../Users/tourGuide.service";

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
			await session.abortTransaction();
			throw new HttpError(404, "Tour Guide not found");
		}

		const itineraryData = new Itinerary({
			itinerary,
			createdBy: new Types.ObjectId(createdBy),
		});

		await itineraryData.save({ session }); // Save to generate the ID

		tourGuide.itinerary.push(itineraryData.id);

		await tourGuide.save({ session });
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

	if (result.length === 0) {
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

	if (result.length === 0) {
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

	const itinerary = await Itinerary.findById(id);
	if (!itinerary) {
		throw new HttpError(404, "Itinerary not found");
	}

	if (itinerary?.numberOfBookings > 0) {
		throw new HttpError(400, "Itinerary is already booked");
	}

	await itinerary.deleteOne();

	return itinerary;
};
