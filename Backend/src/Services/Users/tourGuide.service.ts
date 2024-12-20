import { IBooking } from "@/Models/Purchases/booking.model";
import { IItinerary } from "@/Models/Travel/itinerary.model";
import { id } from "date-fns/locale";
import { Types } from "mongoose";

import {
	IItineraryDTO,
	IItineraryReportResponse,
} from "../../DTOS/Report/ItineraryReportResponse";
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
			if (!newGuide?.acceptedTerms) {
				throw new HttpError(401, "Tour Guide is Not verified");
			}
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

export const report = async (
	id: string,
	options: { date?: string; itineraryId?: string } = {},
): Promise<IItineraryReportResponse> => {
	const tourGuide = await getTourGuideById(id);

	if (!tourGuide) {
		throw new HttpError(404, "Tour Guide not Found");
	}

	let itineraries: IItinerary[] = tourGuide.itinerary as IItinerary[];

	// if itineraryId is provided, filter the bookings by itineraryId
	if (options.itineraryId) {
		itineraries = itineraries.filter(
			(itinerary: IItinerary) => itinerary.id == options.itineraryId,
		);
	}

	// if date is provided, filter the bookings by date
	if (options.date) {
		const [startDateStr, endDateStr] = options.date.split(",");

		// if no date is provided, set the start date the lowest possible date and the end date to today
		let startDate =
			new Date(`${startDateStr}T00:00:00.000+00:00`) ||
			new Date("1970-01-01T00:00:00.000+00:00");
		let endDate =
			endDateStr !== "null"
				? new Date(`${endDateStr}T23:59:59.000+00:00`)
				: new Date();

		if (startDate > endDate) {
			throw new HttpError(400, "Invalid Date Range");
		}

		itineraries = itineraries.filter((itinerary: IItinerary) => {
			const start = new Date(itinerary.startDateTime);
			console.log(start, startDate, endDate);
			return start >= startDate && start <= endDate;
		});
	}

	let totalSales = 0;
	let totalBookings = 0;

	let sales: IItineraryDTO[] = itineraries.map((itinerary: IItinerary) => {
		const adminProfit = itinerary.numberOfBookings * itinerary.price * 0.1;
		totalSales +=
			itinerary.numberOfBookings * itinerary.price - adminProfit;
		totalBookings += itinerary.numberOfBookings;
		return {
			itineraryId: itinerary.id,
			itineraryName: itinerary.title,
			numberOfBookings: itinerary.numberOfBookings,
			totalSales:
				itinerary.numberOfBookings * itinerary.price - adminProfit,
		} as IItineraryDTO;
	});

	return {
		data: sales,
		metaData: {
			totalSales: totalSales,
			totalBookings: totalBookings,
		},
	} as IItineraryReportResponse;
};
