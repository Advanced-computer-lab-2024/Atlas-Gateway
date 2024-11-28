import mongoose, { PipelineStage, Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Notification } from "../../Models/Interactions/notification.model";
import { IBooking } from "../../Models/Purchases/booking.model";
import { IItinerary, Itinerary } from "../../Models/Travel/itinerary.model";
import { Tourist } from "../../Models/Users/tourist.model";
import * as notificationService from "../../Services/Interactions/notification.service";
import AggregateBuilder from "../Operations/aggregation.service";
import { confirmPayment } from "../Payment/payment.service";
import { cancelItinerary } from "../Users/tourist.service";
import * as bookingService from "./../Purchases/booking.service";
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
			...itinerary,
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

export const getAllItineraries = async () => {
	const itineraries = await Itinerary.find();

	return itineraries;
};

export const getItineraries = async (
	type: string,
	userId: string,
	query?: any,
) => {
	const ItineraryFiltersMap: Record<string, PipelineStage> = {
		tourist: {
			$match: {
				$or: [
					{
						isDeleted: false,
						isActive: true,
						isAppropriate: true,
					},
					{
						isDeleted: false,
						tourists: { $in: [new Types.ObjectId(userId)] },
					},
				],
			},
		},
		default: {
			$match: {},
		},
	};
	const filter =
		ItineraryFiltersMap?.[type as keyof typeof ItineraryFiltersMap] ||
		ItineraryFiltersMap.default;
	const pipeline: PipelineStage[] = [
		filter,
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
		await tourGuide.updateOne(
			{
				$pull: { itinerary: id },
			},
			{ session },
		);
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

export const bookItinerary = async (
	itineraryId: string,
	paymentType: string,
	amount: number,
	paymentIntentId: string,
	touristId: string,
) => {
	const itinerary = await getItineraryById(itineraryId);
	if (!itinerary) {
		throw new HttpError(404, "Itinerary not found");
	}

	if (itinerary.availability <= itinerary.numberOfBookings) {
		throw new HttpError(500, "Itinerary is fully booked");
	}
	if (itinerary.startDateTime < new Date()) {
		throw new HttpError(500, "Cannot book past itineraries");
	}

	const booking = await bookingService.createBooking(
		touristId,
		itinerary.price,
		{ itineraryId },
	);
	const tourist = await touristService.addBookedItinerary(
		touristId,
		itineraryId,
		paymentType,
		itinerary.price,
	);

	if (!tourist) {
		throw new HttpError(404, "Couldn't book itinerary in Tourist");
	}

	if (paymentType === "online") {
		await confirmPayment(paymentIntentId, tourist.email, amount / 100);
	}

	await itinerary.updateOne({
		$push: {
			tourists: touristId,
			bookings: booking.id,
		},
		$inc: { numberOfBookings: 1 },
	});

	return itinerary;
};

export const bookmarkItinerary = async (
	itineraryId: string,
	touristId: string,
) => {
	const session = await mongoose.startSession();

	try {
		session.startTransaction();
		const itinerary = await getItineraryById(itineraryId);
		if (!itinerary) {
			throw new HttpError(404, "Itinerary not found");
		}
		const tourist = await touristService.addBookmarkItenerary(
			touristId,
			itineraryId,
		);
		if (!tourist) {
			throw new HttpError(404, "Couldn't bookmark itinerary in Tourist");
		}
		await itinerary.updateOne({
			$push: { touristBookmarks: touristId },
		});
		await session.commitTransaction();
		return itinerary;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

export const cancelBookingItinerary = async (
	itineraryId: string,
	touristId: string,
	userType?: string,
) => {
	const itinerary = await getItineraryById(itineraryId);
	if (!itinerary) {
		throw new HttpError(404, "Itinerary not found");
	}

	const currentDate = new Date();
	const millisecondsBeforeItinerary =
		itinerary.startDateTime.getTime() - currentDate.getTime();
	const hoursBeforeItinerary = millisecondsBeforeItinerary / (1000 * 3600);
	if (hoursBeforeItinerary < 48 && userType !== "admin") {
		throw new HttpError(400, "Cannot cancel within 48 hours of itinerary.");
	}

	if (
		!(itinerary.tourists as Types.ObjectId[]).includes(
			new Types.ObjectId(touristId),
		)
	) {
		throw new HttpError(404, "Tourist not found in itinerary's list");
	}

	await itinerary.populate("bookings");

	const booking = (itinerary.bookings as IBooking[]).find(
		(booking: IBooking) => booking.touristId?.toString() === touristId,
	);

	if (!booking) {
		throw new HttpError(404, "Booking not found");
	}

	const removed = await itinerary.updateOne({
		$pull: {
			tourists: touristId,
			bookings: booking.id,
		},
		$inc: { numberOfBookings: -1 },
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel itinerary booking");
	}

	const tourist = await touristService.cancelItinerary(
		touristId,
		itineraryId,
		itinerary.price,
	);

	if (!tourist) {
		throw new HttpError(404, "Failed to cancel itinerary booking");
	}

	return itinerary;
};

export const removeBookmarkItinerary = async (
	itineraryId: string,
	touristId: string,
) => {
	const session = await mongoose.startSession();

	try {
		session.startTransaction();
		const itinerary = await getItineraryById(itineraryId);
		if (!itinerary) {
			throw new HttpError(404, "Itinerary not found");
		}
		const removed = await itinerary.updateOne({
			$pull: { tourists: touristId },
		});
		if (removed.modifiedCount === 0) {
			throw new HttpError(404, "Failed to remove bookmarked itinerary");
		}
		const tourist = await touristService.removeBookmarkItinerary(
			touristId,
			itineraryId,
		);
		if (!tourist) {
			throw new HttpError(404, "Failed to remove bookmarked itinerary");
		}
		await itinerary.updateOne({
			$pull: { touristBookmarks: touristId },
		});
		await session.commitTransaction();
		return itinerary;
	} catch (err) {
		await session.abortTransaction();
		throw err;
	} finally {
		session.endSession();
	}
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

export const flagItinerary = async (itineraryId: string) => {
	const itinerary = await getItineraryById(itineraryId);

	if (!itinerary) {
		throw new HttpError(404, "Itinerary not found");
	}
	const tourists = itinerary.tourists;
	tourists.forEach(async (tourist) => {
		await cancelBookingItinerary(
			itineraryId,
			tourist.id.toString(),
			"admin",
		);
	});
	const itineraryFlagged = await Itinerary.findByIdAndUpdate(
		itineraryId,
		{ isAppropriate: false },
		{ new: true },
	);

	if (!itineraryFlagged) throw new HttpError(401, "Itinerary not flagged");

	const tourGuideId = itineraryFlagged?.createdBy;

	const tourGuide = await tourGuideService.getTourGuideById(
		tourGuideId.toString(),
	);

	if (!tourGuide) throw new HttpError(404, "TourGuide not found");

	await tourGuide.save();

	await itineraryFlagged.save();

	return itineraryFlagged;
};

export const toggleStatus = async (itineraryId: string) => {
	const itinerary = await getItineraryById(itineraryId);

	if (!itinerary) {
		throw new HttpError(404, "Itinerary not found");
	}

	if (itinerary.numberOfBookings == 0 && !itinerary.isActive) {
		throw new HttpError(400, "Itinerary has not bookings yet");
	}
	console.log(!itinerary.isActive);
	await itinerary.updateOne(
		{
			isActive: !itinerary.isActive,
		},
		{ new: true },
	);
	return itinerary;
};
