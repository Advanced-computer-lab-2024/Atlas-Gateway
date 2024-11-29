import { IBooking } from "@/Models/Purchases/booking.model";
import { IItinerary } from "@/Models/Travel/itinerary.model";
import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { ITourGuide, TourGuide } from "../../Models/Users/tourGuide.model";
import { hashPassword } from "../Auth/password.service";
import uniqueUsername from "../Auth/username.service";
import * as itineraryService from "../Travel/itinerary.service";
import * as adminService from "./admin.service";

export const createTourGuide = async (
	username: string,
	email: string,
	password: string,
) => {
	const resultUnique = await uniqueUsername(username);
	if (!resultUnique) {
		throw new HttpError(400, "Username Should Be Unique");
	}
	const hashedPassword = await hashPassword(password);

	const tourGuide = await TourGuide.create({
		username: username,
		email: email,
		password: hashedPassword,
	});

	return tourGuide;
};

export const getTourGuideById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const tourGuide = await TourGuide.findById(id).populate("itinerary");

	return tourGuide;
};

export const getTourGuides = async () => {
	const tourGuides = await TourGuide.find().populate("itinerary");
	return tourGuides;
};

export const updateTourGuide = async (
	id: string,
	userid: string,
	newGuide: Partial<ITourGuide>,
) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Id is Invalid ");
	}
	if (!Types.ObjectId.isValid(userid)) {
		throw new HttpError(400, "Logged in User id is invalid");
	}

	const admin = await adminService.getAdminById(userid);
	if (!admin) {
		const tourGuide = await TourGuide.findById(id);
		const overRide = true
			? Object.keys(newGuide)[0] == "idPath" ||
				Object.keys(newGuide)[0] == "certificatePath" ||
				Object.keys(newGuide)[0] == "imagePath"
			: false;
		if (!tourGuide?.isVerified && !overRide) {
			throw new HttpError(401, "Tour Guide is Not verified");
		}
	}
	const tourGuide = await TourGuide.findByIdAndUpdate(id, newGuide, {
		new: true,
	});
	return tourGuide;
};

export const deleteTourGuide = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const tourGuide = await TourGuide.findByIdAndDelete(id);
	return tourGuide;
};

/*
"an account will be deleted only if no events or activities or itenararies are upcoming and have bookings that are paid for.
 The account profiles along with all associated events, activities and itineraries will not be visible to tourists."
 */

export const softDeleteTourGuide = async (id: string) => {
	const tourGuide = await getTourGuideById(id);

	if (!tourGuide) {
		throw new HttpError(404, "Tour Guide not found");
	}

	tourGuide.itinerary.forEach(async (itinerary: any) => {
		await itineraryService.softDeleteItinerary(itinerary._id);
	});

	await tourGuide.updateOne({ isDeleted: true });

	return tourGuide;
};

export const salesReport = async (
	id: string,
	itineraryId?: string,
	date?: string,
) => {
	const tourGuide = await getTourGuideById(id);

	if (!tourGuide) {
		throw new HttpError(404, "Tour Guide not Found");
	}

	await tourGuide.populate({
		path: "itinerary",
		populate: { path: "bookings" },
	});

	let itineraries: IItinerary[] = tourGuide.itinerary as IItinerary[];

	// if itineraryId is provided, filter the bookings by itineraryId
	if (itineraryId) {
		itineraries = itineraries.filter(
			(itinerary: IItinerary) => itinerary.id == itineraryId,
		);
	}

	// if date is provided, filter the bookings by date
	if (date) {
		const [startDateStr, endDateStr] = date.split(",");

		// if no date is provided, set the start date the lowest possible date and the end date to today
		let startDate =
			new Date(startDateStr) || new Date("1970-01-01T00:00:00.000Z");
		let endDate = endDateStr !== "null" ? new Date(endDateStr) : new Date();

		if (startDate > endDate) {
			throw new HttpError(400, "Invalid Date Range");
		}
		itineraries.forEach((itinerary: IItinerary) => {
			itinerary.bookings = (itinerary.bookings as IBooking[]).filter(
				(booking: IBooking) =>
					booking.createdAt >= new Date(startDate) &&
					booking.createdAt <= new Date(endDate),
			);
		});
	}

	let sales = 0;

	itineraries.forEach((itinerary: IItinerary) => {
		(itinerary.bookings as IBooking[]).forEach((booking: IBooking) => {
			sales += booking.totalPrice;
		});
	});

	return sales;
};

export const bookingsReport = async (month?: Date) => {};
