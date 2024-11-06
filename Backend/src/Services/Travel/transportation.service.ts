import mongoose, { PipelineStage, Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import AggregateBuilder from "../Operations/aggregation.service";
import { Tourist } from "@/Models/Users/tourist.model";
import { cancelTransportation } from "../Users/tourist.service";
import { ITransportation, Transportation } from "@/Models/Travel/transportation.model";

export const createTransportation = async (
	transportation: ITransportation,
	createdBy: string,
) => {
	const session = await mongoose.startSession();
	try {
		if (!Types.ObjectId.isValid(createdBy)) {
			throw new HttpError(400, "Invalid Advertiser ID");
		}

		session.startTransaction();

		// Link transportation ID to the Advertiser's transportation array
		const Advertiser = await AdvertiserService.getAdvertiserById(createdBy);

		if (!Advertiser) {
			throw new HttpError(404, "Advertiser not found");
		}

		const transportationData = new transportation({
			transportation,
			createdBy: new Types.ObjectId(createdBy),
		});

		await transportationData.save({ session }); // Save to generate the ID

		Advertiser.transportations.push(transportationData.id);

		await Advertiser.updateOne({ session });
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

	const transportation = await Transportation.findById(id)
		.populate("tags")
		.populate("createdBy");

	if (!transportation) {
		throw new HttpError(404, "Transportation not Found");
	}

	return transportation;
};

export const updateTransportation = async (id: string, newTransportation: ITransportation) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const transportation = await Transportation.findByIdAndUpdate(id, newTransportation, {
		new: true,
	});

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
		const transportation = await Transportation.findById(id).session(session);
		if (!transportation) {
			throw new HttpError(404, "Transportation not found");
		}

		// Check if the transportation has any bookings
		if (transportation.numberOfBookings > 0) {
			throw new HttpError(400, "Transportation is already booked");
		}

		// Find the associated Advertiser document
		const AdvertiserId = transportation.createdBy; // Assuming createdBy is the Advertiser ID
		const Advertiser = await AdvertiserService.getAdvertiserById(
			AdvertiserId.toString(),
		);
		if (!Advertiser) {
			throw new HttpError(404, "Advertiser not found");
		}

		// Remove the transportation ID from the Advertiser's itineraries array
		Advertiser.transportations = Advertiser.transportations.filter(
			(transportationId) => !transportationId.equals(id),
		);
		await Advertiser.updateOne({ session });
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

export const booktransportation = async (transportationId: string, touristId: string) => {
	const transportation = await Transportation.findById(transportationId);
	if (!transportation) {
		throw new HttpError(404, "Transportation not found");
	}

	if (transportation.availability <= transportation.numberOfBookings) {
		throw new HttpError(500, "Transportation is fully booked");
	}
	const tourist = await Tourist.findById(touristId);

	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	transportation.tourists.push(tourist.id);

	transportation.numberOfBookings++;

	const result = await transportation.save();

	return result;
};

export const cancelBookingtransportation = async (transportationId: string, touristId: string) => {
	const transportation = await Transportation.findById(transportationId);
	if (!transportation) {
	  throw new HttpError(404, "Transportation not found");
	}
  
	const currentDate = new Date();
	const millisecondsBeforetransportation = transportation.dateTime.getTime() - currentDate.getTime();
	const hoursBeforetransportation = millisecondsBeforetransportation / (1000 * 3600);
  
	if (hoursBeforetransportation < 48) {
	  throw new HttpError(400, "Cannot cancel within 48 hours of transportation.");
	}

	const tourist = await Tourist.findById(touristId);

	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
  
	if (!transportation.tourists.includes(tourist.id)) {
		throw new HttpError(404, "Transportation not found in the tourist's list");
	}

	const removed = await transportation.updateOne({
		$pull: { tourists: touristId }
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel transportation booking");
	}
	let touristResult;
	try {
		touristResult = await cancelTransportation(touristId, transportation.id);
	} catch (error) {
	  throw new HttpError(500, "Failed to cancel tourist booking.");
	}
	if (!touristResult) {
	  throw new HttpError(404, "Tourist not found");
	}
  
	transportation.numberOfBookings--;
  
	const result = await transportation.save();
	return result;
  };
