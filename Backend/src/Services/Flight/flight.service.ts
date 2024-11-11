import mongoose, { Types } from "mongoose";

import amadeus from "../../Config/amadeus.config";
import HttpError from "../../Errors/HttpError";
import { Flight, IFlight } from "../../Models/Flight/flight.model";
import { Tourist } from "../../Models/Users/tourist.model";

export interface Segment {
	departure: {
		at: string;
		iataCode: string;
	};
	arrival: {
		at: string;
		iataCode: string;
	};
	carrierCode: string;
	number: string;
}

export interface Itinerary {
	segments: Segment[];
}

export interface FirstFlight {
	itineraries: Itinerary[];
	validatingAirlineCodes: string[];
	price: {
		total: string;
	};
	travelerPricings: {
		travelerId: string;
		fareOption: string;
		travelerType: string;
		price: {
			currency: string;
			total: string;
			base: string;
		};
		fareDetailsBySegment: {
			segmentId: string;
			cabin: string;
			fareBasis: string;
			class: string;
			includedCheckedBags: {
				quantity: number;
			};
		}[];
	}[];
}
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

export const deleteFlight = async (id: string, touristId: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid Flight ID");
	}

	if (!Types.ObjectId.isValid(touristId)) {
		throw new HttpError(400, "Invalid Tourist ID");
	}

	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		// Find the flight to check its existence
		const flight = await Flight.findById(id).session(session);
		if (!flight) {
			throw new HttpError(404, "Flight not found");
		}

		// Check if the touristId matches the touristID in the flight model
		if (!flight.touristID.equals(new Types.ObjectId(touristId))) {
			throw new HttpError(403, "Tourist ID does not match");
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

export const bookFlightService = async (flight: IFlight, userid: string) => {
	if (!Types.ObjectId.isValid(userid)) {
		throw new HttpError(400, "Invalid Tourist ID");
	}
	const tourist = await Tourist.findById(userid);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	const newFlight = {
		...flight,
		touristID: new mongoose.Types.ObjectId(userid),
	};
	const bookedFlight = await Flight.create(newFlight);
	await tourist.updateOne(
		{ $push: { bookedFlights: bookedFlight._id } },
		{ new: true },
	);
	// // Extract travelClass from the first segment's cabin
	// const travelClass =
	// 	firstFlight.travelerPricings[0].fareDetailsBySegment[0].cabin;

	// // Extract the number of booked tickets
	// const bookedTickets = firstFlight.travelerPricings.length;
	// const newFlight = new Flight({
	// 	ticketType: firstFlight.itineraries.length > 1 ? "return" : "one-way",
	// 	departure: {
	// 		dateTime: new Date(
	// 			firstFlight.itineraries[0].segments[0].departure.at,
	// 		),
	// 		location: firstFlight.itineraries[0].segments[0].departure.iataCode,
	// 		airline: firstFlight.validatingAirlineCodes[0],
	// 		flightNumber:
	// 			firstFlight.itineraries[0].segments[0].carrierCode +
	// 			firstFlight.itineraries[0].segments[0].number,
	// 	},
	// 	returnTrip:
	// 		firstFlight.itineraries.length > 1
	// 			? {
	// 					dateTime: new Date(
	// 						firstFlight.itineraries[1].segments[0].departure.at,
	// 					),
	// 					location:
	// 						firstFlight.itineraries[1].segments[0].departure
	// 							.iataCode,
	// 					airline: firstFlight.validatingAirlineCodes[0],
	// 					flightNumber:
	// 						firstFlight.itineraries[1].segments[0].carrierCode +
	// 						firstFlight.itineraries[1].segments[0].number,
	// 				}
	// 			: undefined,
	// 	segments: firstFlight.itineraries.flatMap(
	// 		(itinerary: Itinerary, index: number) =>
	// 			itinerary.segments.map(
	// 				(segment: Segment, segIndex: number) => ({
	// 					leg: index + 1,
	// 					departureTime: new Date(segment.departure.at),
	// 					arrivalTime: new Date(segment.arrival.at),
	// 					from: segment.departure.iataCode,
	// 					to: segment.arrival.iataCode,
	// 				}),
	// 			),
	// 	),
	// 	price: Number(firstFlight.price.total),
	// 	travelClass: travelClass,
	// 	bookedTickets: bookedTickets,
	// 	touristID: new mongoose.Types.ObjectId(userid),
	// });
	return tourist;
};
