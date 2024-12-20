import mongoose, { PipelineStage, Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import {
	ITransportation,
	Transportation,
} from "../../Models/Travel/transportation.model";
import { TransportationAdvertiser } from "../../Models/Users/transportation_advertiser.model";
import AggregateBuilder from "../Operations/aggregation.service";
import {
	addBookedTransportation,
	cancelTransportation,
	getTouristById,
} from "../Users/tourist.service";
import { getTransportationAdvertiserById } from "../Users/transportation_advertiser.service";

const TransportationFiltersMap: Record<string, PipelineStage> = {
	tourist: {
		$match: {},
	},
	default: {
		$match: {},
	},
};

export const createTransportation = async (
	transportation: ITransportation,
	createdBy: string,
) => {
	const session = await mongoose.startSession();
	try {
		if (!Types.ObjectId.isValid(createdBy)) {
			throw new HttpError(400, "Invalid Transportation Advertiser ID");
		}

		session.startTransaction();

		// Link transportation ID to the Advertiser's transportation array
		const TransportationAdvertiser =
			await getTransportationAdvertiserById(createdBy);

		if (!TransportationAdvertiser) {
			throw new HttpError(404, "Transportation Advertiser not found");
		}

		const transportationData = new Transportation({
			...transportation,
			createdBy: TransportationAdvertiser.id,
		});

		await transportationData.save({ session }); // Save to generate the ID

		await TransportationAdvertiser.updateOne(
			{
				$push: { transportations: transportationData.id },
			},
			{ session },
		);
		await session.commitTransaction();

		return transportationData;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

export const getTransportationById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid Transportation ID");
	}

	const transportation =
		await Transportation.findById(id).populate("createdBy");

	if (!transportation) {
		throw new HttpError(404, "Transportation not Found");
	}

	return transportation;
};

export const updateTransportation = async (
	id: string,
	newTransportation: ITransportation,
) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const transportation = await Transportation.findByIdAndUpdate(
		id,
		newTransportation,
		{
			new: true,
		},
	);

	return transportation;
};

export const deleteTransportation = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid Transportation ID");
	}

	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		// Find the transportation to check its details
		const transportation =
			await Transportation.findById(id).session(session);
		if (!transportation) {
			throw new HttpError(404, "Transportation not found");
		}

		// Check if the transportation has any bookings
		if (transportation.numberOfBookings > 0) {
			throw new HttpError(400, "Transportation is already booked");
		}

		// Find the associated Transportation Advertiser document
		const TransportationAdvertiserId = transportation.createdBy; // Assuming createdBy is the Advertiser ID
		const transportation_advertiser = await getTransportationAdvertiserById(
			TransportationAdvertiserId.toString(),
		);
		if (!transportation_advertiser) {
			throw new HttpError(404, "Transportation Advertiser not found");
		}

		// Remove the transportation ID from the Advertiser's itineraries array

		await transportation_advertiser.updateOne(
			{
				$pull: { transportations: id },
			},
			{ session },
		);
		// Delete the transportation
		await transportation.deleteOne({ session });

		await session.commitTransaction();

		return transportation;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

export const bookTransportation = async (
	transportationId: string,
	touristId: string,
) => {
	const transportation = await Transportation.findById(transportationId);
	if (!transportation) {
		throw new HttpError(404, "Transportation not found");
	}

	if (transportation.availability <= transportation.numberOfBookings) {
		throw new HttpError(500, "Transportation is fully booked");
	}

	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	const alreadyBooked = transportation.tourists.includes(tourist.id);

	if (alreadyBooked) {
		throw new HttpError(400, "Already booked this Transportation");
	}

	const booked = await addBookedTransportation(tourist.id, transportation.id);

	if (!booked) {
		throw new HttpError(400, "Couldn't book Transportation");
	}

	transportation.tourists.push(tourist.id);

	transportation.numberOfBookings++;

	const result = await transportation.save();
	return result;
};

export const cancelBookingTransportation = async (
	transportationId: string,
	touristId: string,
) => {
	if (
		!Types.ObjectId.isValid(transportationId) ||
		!Types.ObjectId.isValid(touristId)
	) {
		throw new HttpError(400, "Invalid Transportation or Tourist ID");
	}

	const transportation = await Transportation.findById(transportationId);
	if (!transportation) {
		throw new HttpError(404, "Transportation not found");
	}

	const currentDate = new Date();
	const millisecondsBeforeTransportation =
		transportation.pickUpTime.getTime() - currentDate.getTime();
	const hoursBeforeTransportation =
		millisecondsBeforeTransportation / (1000 * 3600);
	if (hoursBeforeTransportation < 48) {
		throw new HttpError(
			400,
			"Cannot cancel within 48 hours of transportation.",
		);
	}

	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	if (!transportation.tourists.includes(tourist.id)) {
		throw new HttpError(
			404,
			"Transportation not found in the tourist's list",
		);
	}

	const removed = await transportation.updateOne({
		$pull: { tourists: touristId },
		$inc: { numberOfBookings: -1 },
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel transportation booking");
	}

	let touristResult;
	try {
		touristResult = await cancelTransportation(
			touristId,
			transportation.id,
		);
	} catch (error) {
		throw new HttpError(500, "Failed to cancel tourist booking.");
	}

	if (!touristResult) {
		throw new HttpError(404, "Tourist not found in the system");
	}

	const result = await transportation.save();
	return result;
};

export const getTransportations = async (type: string, query: any) => {
	const filter =
		TransportationFiltersMap?.[
			type as keyof typeof TransportationFiltersMap
		] || TransportationFiltersMap.default;

	const pipeline: PipelineStage[] = [filter, ...AggregateBuilder(query, [])];

	const result = await Transportation.aggregate(pipeline);

	if (result[0].data.length === 0) {
		throw new HttpError(404, "No Transportations Found");
	}

	return result;
};

export const getTransportationByUserId = async (userId: string, query: any) => {
	if (!Types.ObjectId.isValid(userId)) {
		throw new HttpError(400, "Invalid Transportation Advertiser ID");
	}

	const pipeline: PipelineStage[] = [
		{
			$match: {
				createdBy: new Types.ObjectId(userId),
			},
		},
		...AggregateBuilder(query, []),
	];

	const transportations = await Transportation.aggregate(pipeline);

	return transportations;
};
