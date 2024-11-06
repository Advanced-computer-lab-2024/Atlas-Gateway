import { NextFunction, Request, Response } from "express";

import { Itinerary } from "../../Models/Travel/itinerary.model";
import AggregateBuilder from "../../Services/Operations/aggregation.service";
import { Tourist } from "@/Models/Users/tourist.model";
import { addBookedItinerary, cancelItinerary } from "@/Services/Users/tourist.service";
import * as itineraryService from "../../Services/Travel/itinerary.service";

export const createItinerary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const tourGuideId = req.headers.userid;
		if (!tourGuideId) {
			throw new HttpError(400, "User id is required");
		}
		const itinerary = await itineraryService.createItinerary(
			req.body,
			tourGuideId.toString(),
		);

		res.status(201).json(itinerary);
	} catch (err) {
		next(err);
	}
};

export const getItineraryById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		if (!id) {
			throw new HttpError(400, "id is required");
		}

		const itinerary = await itineraryService.getItineraryById(id);

		res.status(200).send(itinerary);
	} catch (error) {
		next(error);
	}
};

export const getItineraryByUserId = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const tourGuideId = req.headers.userid;

		if (!tourGuideId) {
			return res
				.status(400)
				.json({ message: "Tour Guide ID is required" });
		}

		const result = await itineraryService.getItineraryByUserId(
			tourGuideId.toString(),
			req.query,
		);

		const response = {
			data: result?.[0]?.data,
			metaData: {
				page: req.query.page || 1,
				total: result[0]?.total[0]?.count,
				pages: Math.ceil(
					(result[0]?.total[0]?.count ?? 0) /
					(Number(req?.query?.limit) || 10),
				),
			},
		};
		res.status(200).send(response);
	} catch (error) {
		next(error);
	}
};

export const getItineraries = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await itineraryService.getItineraries(req.query);
		const response = {
			data: result?.[0]?.data,
			metaData: {
				page: req.query.page || 1,
				total: result[0]?.total[0]?.count,
				pages: Math.ceil(
					(result[0]?.total[0]?.count ?? 0) /
					(Number(req?.query?.limit) || 10),
				),
			},
		};

		res.status(200).send(response);
	} catch (error) {
		next(error);
	}
};

export const updateItinerary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const itineraryId = req.params.id;

		if (!itineraryId) {
			throw new HttpError(400, "itinerary id is required");
		}

		const itinerary = await itineraryService.updateItinerary(
			itineraryId,
			req.body,
		);

		res.status(200).send(itinerary);
	} catch (error) {
		next(error);
	}
};

export const bookitinerary = async (req: Request, res: Response) => {
	try {
		const itineraryId = req.params.itineraryId;
		const touristId = req.headers.userId;

		if (!touristId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		if (!Types.ObjectId.isValid(itineraryId)) {
			return res.status(400).json({ message: "Invalid Itinerary ID" });
		}

		const itinerary = await Itinerary.findById(itineraryId);
		if (!itinerary) {
			return res.status(404).json({ message: "Itinerary not found" });
		}

		if (itinerary.numberOfBookings < itinerary.availability) {
			const tId = touristId.toString();
			const tourist = await addBookedItinerary(tId, itinerary.id);

			if (!tourist) {
				return res.status(500).json({ message: "Error booking Activity" });
			}

			itinerary.tourists.push(tourist.id);

			itinerary.numberOfBookings++;

			await itinerary.save();

			return res.status(201).json({ message: "Itinerary booked successfully" });
		}
		return res.status(505).json({ message: "Can't book. Itinerary is fully booked" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Error booking itinerary" });
	}
};

export const cancelBookingItinerary = async (req: Request, res: Response) => {
	try {
		const itineraryId = req.params.itineraryId;
		const touristId = req.headers.touristId;

		if (!touristId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		if (!Types.ObjectId.isValid(itineraryId)) {
			return res.status(400).json({ message: "Invalid Itinerary ID" });
		}

		const itinerary = await Itinerary.findById(itineraryId);
		if (!itinerary) {
			return res.status(404).json({ message: "Itinerary not found" });
		}

		const tId = touristId.toString();

		const currentDate = new Date();
		const millisecondsBeforeItinerary = itinerary.startDateTime.getTime() - currentDate.getTime();
		const hoursBeforeItinerary = millisecondsBeforeItinerary / (1000 * 3600);

		if (hoursBeforeItinerary >= 48) {
			itinerary.tourists = itinerary.tourists.filter(tourist => tourist.id.toString() !== touristId.toString());
			const tourist = await cancelItinerary(tId, itinerary.id);

			if (!tourist) {
				return res.status(505).send("Tourist didn't book this itinerary");
			}

			itinerary.numberOfBookings--;

			await itinerary.save();

			return res.status(200).send("Booking canceled successfully");
		}
		return res.status(505).send("Cannot cancel this Booking");
	} catch (error) {
		return res.status(505).send("Error canceling this Booking");
	}
};

export const deleteItinerary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		if (!id) {
			throw new HttpError(400, "id is required");
		}

		await itineraryService.deleteItinerary(id);

		res.status(200).send("Itinerary deleted Successfully");
	} catch (error) {
		next(error);
	}
};
