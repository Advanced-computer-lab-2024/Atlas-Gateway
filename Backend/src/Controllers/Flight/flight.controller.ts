import { NextFunction, Request, Response } from "express";

import { Flight } from "../../Models/Flight/flight.model";
import {
	deleteFlight,
	searchFlightsApi,
} from "../../Services/Flight/flight.service";

interface Segment {
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

interface Itinerary {
	segments: Segment[];
}

interface FirstFlight {
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

export const saveFlight = async (req: Request, res: Response) => {
	try {
		const firstFlight: FirstFlight = req.body;

		// Extract travelClass from the first segment's cabin
		const travelClass =
			firstFlight.travelerPricings[0].fareDetailsBySegment[0].cabin;

		// Extract the number of booked tickets
		const bookedTickets = firstFlight.travelerPricings.length;

		const newFlight = new Flight({
			ticketType:
				firstFlight.itineraries.length > 1 ? "return" : "one-way",
			departure: {
				dateTime: new Date(
					firstFlight.itineraries[0].segments[0].departure.at,
				),
				location:
					firstFlight.itineraries[0].segments[0].departure.iataCode,
				airline: firstFlight.validatingAirlineCodes[0],
				flightNumber:
					firstFlight.itineraries[0].segments[0].carrierCode +
					firstFlight.itineraries[0].segments[0].number,
			},
			returnTrip:
				firstFlight.itineraries.length > 1
					? {
							dateTime: new Date(
								firstFlight.itineraries[1].segments[0].departure.at,
							),
							location:
								firstFlight.itineraries[1].segments[0].departure
									.iataCode,
							airline: firstFlight.validatingAirlineCodes[0],
							flightNumber:
								firstFlight.itineraries[1].segments[0]
									.carrierCode +
								firstFlight.itineraries[1].segments[0].number,
						}
					: undefined,
			segments: firstFlight.itineraries.flatMap(
				(itinerary: Itinerary, index: number) =>
					itinerary.segments.map(
						(segment: Segment, segIndex: number) => ({
							leg: index + 1,
							departureTime: new Date(segment.departure.at),
							arrivalTime: new Date(segment.arrival.at),
							from: segment.departure.iataCode,
							to: segment.arrival.iataCode,
						}),
					),
			),
			price: Number(firstFlight.price.total),
			travelClass: travelClass,
			bookedTickets: bookedTickets,
		});

		// Save the flight to the database
		const savedFlight = await newFlight.save();
		console.log("First flight saved:", savedFlight);

		return res.status(201).json(savedFlight);
	} catch (error) {
		console.error("Error in saveFlight:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export const searchFlights = async (req: Request, res: Response) => {
	try {
		const flights = await searchFlightsApi(req.body);
		//console.log("Flights found:", flights);
		return res.status(200).json(flights);
	} catch (error) {
		console.error("Error in searchFlights:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export const deleteFlightController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		await deleteFlight(id);
		res.status(200).send("Flight deleted successfully");
	} catch (error) {
		next(error);
	}
};
