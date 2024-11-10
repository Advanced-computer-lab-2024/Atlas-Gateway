import mongoose, { Types } from "mongoose";

import amadeus from "../../Config/amadeus.config";
import HttpError from "../../Errors/HttpError";
import { Flight } from "../../Models/Flight/flight.model";

interface FlightSearchParams {
	originLocationCode: string;
	destinationLocationCode: string;
	departureDate: string;
	returnDate?: string;
	adults: number;
	children?: number;
	directFlightsOnly?: boolean;
	travelClass?: "ECONOMY" | "BUSINESS" | "PREMIUM_ECONOMY" | "FIRST";
}

export async function searchFlightsApi(params: FlightSearchParams) {
	try {
		const searchParams: any = {
			originLocationCode: params.originLocationCode,
			destinationLocationCode: params.destinationLocationCode,
			departureDate: params.departureDate,
			adults: params.adults.toString(),
			currencyCode: "EGP",
		};

		if (params.returnDate) {
			searchParams.returnDate = params.returnDate;
		}

		if (params.children) {
			searchParams.children = params.children.toString();
		}

		if (params.directFlightsOnly) {
			searchParams.nonStop = true;
		}
		if (params.travelClass) {
			searchParams.travelClass = params.travelClass;
		}
		const response =
			await amadeus.shopping.flightOffersSearch.get(searchParams);
		return response.data;
	} catch (error) {
		console.error("Error in searchFlightsApi:", error);
		throw error;
	}
}

export const deleteFlight = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid Flight ID");
	}

	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		// Find the flight to check its existence
		const flight = await Flight.findById(id).session(session);
		if (!flight) {
			throw new HttpError(404, "Flight not found");
		}

		// Delete the flight
		await flight.deleteOne({ session });

		await session.commitTransaction();

		return flight; // Return the deleted flight information if needed
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};
