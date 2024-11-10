import { NextFunction, Request, Response } from "express";

import { Flight } from "../../Models/Flight/flight.model";
import {
	FirstFlight,
	Itinerary,
	Segment,
	bookFlightService,
	deleteFlight,
	searchFlightsApi,
} from "../../Services/Flight/flight.service";

export const bookFlight = async (req: Request, res: Response) => {
	try {
		const firstFlight: FirstFlight = req.body;
		const userid = req.headers.userid;
		if (!userid) {
			return res.status(500).json({ error: "Tourist ID is required" });
		}

		const newFlight = await bookFlightService(
			firstFlight,
			userid.toString(),
		);

		// Save the flight to the database
		const savedFlight = await newFlight.save();
		console.log("First flight saved:", savedFlight);

		return res.status(201).json(savedFlight);
	} catch (error) {
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
		const userid = req.headers.userid;
		if (!userid) {
			return res.status(500).json({ error: "Tourist ID is required" });
		}
		await deleteFlight(id, userid.toString());
		res.status(200).send("Flight deleted successfully");
	} catch (error) {
		next(error);
	}
};
