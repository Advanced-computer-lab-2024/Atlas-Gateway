import mongoose, { PipelineStage, Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { IPlaces, Places } from "../../Models/Travel/places.model";
import AggregateBuilder from "../../Services/Operations/aggregation.service";
import * as governorService from "../Users/governor.service";

export const createPlace = async (createdBy: string, place: IPlaces) => {
	const session = await mongoose.startSession();
	try {
		if (!Types.ObjectId.isValid(createdBy)) {
			throw new HttpError(400, "Invalid Tour Guide ID");
		}

		session.startTransaction();

		// Link itinerary ID to the tour guide's itinerary array
		const governor = await governorService.getGovernorById(createdBy);

		if (!governor) {
			throw new HttpError(404, "Governor not found");
		}

		const placeData = new Places({
			place,
			governorId: new Types.ObjectId(createdBy),
		});

		await placeData.save({ session }); // Save to generate the ID

		await governor.updateOne(
			{ $push: { places: placeData.id } },
			{ session },
		);
		await session.commitTransaction();

		return placeData;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

export const getPlaces = async (query: any) => {
	const pipeline: PipelineStage[] = [
		{
			$lookup: {
				from: "tags",
				localField: "tags",
				foreignField: "_id",
				as: "tags",
			},
		},

		...AggregateBuilder(query, ["name", "tagsData.name"]),
	];

	const result = await Places.aggregate(pipeline);

	if (result[0].data.length === 0) {
		throw new HttpError(404, "No Places Found");
	}

	return result;
};

export const getPlacesByUserId = async (userid: string, query: any) => {
	if (!Types.ObjectId.isValid(userid)) {
		throw new HttpError(400, "Invalid Governer ID");
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
				governorId: new Types.ObjectId(userid),
			},
		},
		...AggregateBuilder(query, ["name", "tagsData.name"]),
	];

	const result = await Places.aggregate(pipeline);

	if (result[0].data.length === 0) {
		throw new HttpError(404, "No matching Places Found");
	}

	return result;
};

export const getPlaceById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid Place ID");
	}
	const place = await Places.findById(id).populate("tags");
	if (!place) {
		throw new HttpError(404, "Place not found");
	}

	return place;
};

export const updatePlace = async (id: string, newplace: IPlaces) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is not valid");
	}

	const place = await Places.findById(id);
	if (!place) {
		throw new HttpError(404, "Place not found");
	}

	place.set(newplace);

	await place.save();

	return place;
};

export const deletePlace = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid Place ID");
	}

	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		// Find the place to check its existence
		const place = await Places.findById(id).session(session);
		if (!place) {
			throw new HttpError(404, "Place not found");
		}
		const governor = await governorService.getGovernorById(
			place.governorId.toString(),
		);

		if (!governor) {
			throw new HttpError(404, "Governor not found");
		}

		governor.places = governor.places.filter(
			(placesId) => !placesId.equals(id),
		);

		await governor.updateOne({ session });
		// Delete the place
		await place.deleteOne({ session });

		await session.commitTransaction();

		return place; // Return the deleted place information if needed
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};
