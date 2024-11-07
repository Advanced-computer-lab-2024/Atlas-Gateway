import mongoose, { PipelineStage, Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import {
	ITransportation,
	Transportation,
} from "../../Models/Travel/transportation.model";
import { Advertiser } from "../../Models/Users/advertiser.model";

import { TransportationAdvertiser } from "@/Models/Users/transportation_advertiser.model";
import { Tourist } from "@/Models/Users/tourist.model";

import AggregateBuilder from "../Operations/aggregation.service";
import { getAdvertiserById } from "../Users/advertiser.service";
import { addBookedTransportation, cancelTransportation, getTouristById } from "../Users/tourist.service";
import { getTransportationAdvertiserById } from "../Users/transportation_advertiser.service";

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
			transportation,
			createdBy: new Types.ObjectId(createdBy),
		});

		await transportationData.save({ session }); // Save to generate the ID

		TransportationAdvertiser.transportations.push(transportationData.id);

		await TransportationAdvertiser.updateOne({ session });
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
		transportation_advertiser.transportations =
			transportation_advertiser.transportations.filter(
				(transportationId) => !transportationId.equals(id),
			);
		await TransportationAdvertiser.updateOne({ session });
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
	try {
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

		const booked = await addBookedTransportation(
			tourist.id,
			transportation.id,
		);

		if (!booked) {
			throw new HttpError(400, "Couldn't book Transportation");
		}

		transportation.tourists.push(tourist.id);

		transportation.numberOfBookings++;

		const result = await transportation.save();
		return result;
	} catch (error) {
		if (error instanceof HttpError) {
			throw error;
		} else {
			console.error("Unexpected error in bookTransportation:", error);
			throw new HttpError(
				500,
				"An unexpected error occurred while booking the transportation",
			);
		}
	}
};

export const cancelBookingTransportation = async (
	transportationId: string,
	touristId: string,
) => {
	try {
		const transportation = await Transportation.findById(transportationId);
		if (!transportation) {
			throw new HttpError(404, "Transportation not found");
		}

		const currentDate = new Date();
		const millisecondsBeforeTransportation =
			transportation.dateTime.getTime() - currentDate.getTime();
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
	} catch (error) {
		if (error instanceof HttpError) {
			throw error;
		} else {
			console.error(
				"Unexpected error in cancelBookingTransportation:",
				error,
			);
			throw new HttpError(
				500,
				"An unexpected error occurred while canceling the transportation booking",
			);
		}
	}
};
