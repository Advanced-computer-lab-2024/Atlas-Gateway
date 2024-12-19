import mongoose, { Types } from "mongoose";

import amadeus from "../../Config/amadeus.config";
import HttpError from "../../Errors/HttpError";
import { HotelBooking, IHotelBooking } from "../../Models/Hotel/hotel.model";
import { Tourist } from "../../Models/Users/tourist.model";
import { addBookedHotelOffer, getTouristById } from "../Users/tourist.service";

interface HotelSearchParams {
	cityCode: string;
	checkInDate: string;
	checkOutDate: string;
	adults: string;
	page: number;
}

export async function getHotelsByCity(cityCode: string) {
	// const accessToken = amadeus.location.client.accessToken.accessToken HOLD THAT THOUGHT
	const response = await amadeus.referenceData.locations.hotels.byCity.get({
		cityCode: cityCode,
	});
	return response.data;
}

export async function showHotelDetails(id: string) {
	const response = await amadeus.shopping.hotelOffersSearch.get({
		hotelIds: ["MCLONGHM"],
	});
	return response.data;
}

export async function saveHotelOffer(data: IHotelBooking, touristId: string) {
	try {
		const hotelBooking: IHotelBooking = new HotelBooking(data);

		const tourist = await getTouristById(touristId);
		if (!tourist) {
			throw new HttpError(404, "Tourist not found");
		}

		const alreadyBooked = tourist.bookedTransportations.includes(
			hotelBooking.id,
		);

		if (alreadyBooked) {
			throw new HttpError(400, "Already booked this Transportation");
		}

		const booked = await addBookedHotelOffer(tourist.id, hotelBooking.id);

		if (!booked) {
			throw new HttpError(400, "Couldn't book Transportation");
		}

		const result = await hotelBooking.save();
		return result;
	} catch (error) {
		console.error("Error in saveHotelOffer:", error);
		throw error;
	}
}
export async function deleteHotelBooking(id: string, userid: any) {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid Hotel ID");
	}
	if (!Types.ObjectId.isValid(userid)) {
		throw new HttpError(400, "Invalid User ID");
	}

	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		// Find the hotel booking to check its existence
		const hotelBooking = await HotelBooking.findById(id).session(session);
		if (!hotelBooking) {
			throw new HttpError(404, "Hotel Booking not found");
		}

		// Delete the hotel booking
		await HotelBooking.deleteOne(
			{ _id: id, touristID: userid },
			{ session },
		);

		// Remove the hotel booking from the tourist's booked hotel offers
		await Tourist.findByIdAndUpdate(
			userid,
			{ $pull: { bookedHotelOffers: id } },
			{ session },
		);

		await session.commitTransaction();

		return hotelBooking; // Return the deleted hotel booking information if needed
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
}
