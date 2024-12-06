import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Itinerary } from "../../Models/Travel/itinerary.model";
import { Tourist } from "../../Models/Users/tourist.model";
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
		const usertype = req.headers.usertype as string;
		const userId = req.headers.userid as string;
		if (!usertype) {
			throw new HttpError(400, "User type is required");
		}
		if (!userId) {
			throw new HttpError(400, "User ID is required");
		}
		const result = await itineraryService.getItineraries(
			usertype,
			userId,
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

export const bookItinerary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const itineraryId = req.params.id;
		const touristId = req.headers.userid;

		if (!touristId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		if (!itineraryId) {
			return res
				.status(400)
				.json({ message: "Itinerary ID is required" });
		}

		const bookingResult = await itineraryService.bookItinerary(
			itineraryId,
			touristId.toString(),
		);

		if (!bookingResult) {
			return res.status(400).json({ message: "Cannot book Itinerary" });
		}

		return res
			.status(201)
			.json({ message: "Itinerary booked successfully" });
	} catch (error) {
		next(error);
	}
};

export const bookmarkItinerary = async(
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const itineraryId = req.params.id;
		const touristId = req.headers.userid;

		if (!touristId) {
			return res.status(400).json({ message: "User ID is required" });
		}
		if (!itineraryId) {
			return res.status(400).json({ message: "Itinerary ID is required" });
		}
		const bookmarkResult = await itineraryService.bookmarkItinerary(
			itineraryId,
			touristId.toString(),
			
		);
		if (!bookmarkResult) {
			return res.status(400).json({ message: "Cannot bookmark Itinerary" });
		}
		return res.status(201).json({ message: "Itinerary bookmarked successfully" });
	} catch (error) {
		next(error);
	}
}

export const cancelBookingItinerary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const itineraryId = req.params.id;
		const touristId = req.headers.userid;

		if (!touristId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		if (!itineraryId) {
			return res
				.status(400)
				.json({ message: "Itinerary ID is required" });
		}

		const cancelBookingResult =
			await itineraryService.cancelBookingItinerary(
				itineraryId,
				touristId.toString(),
			);
		if (!cancelBookingResult) {
			return res.status(400).json({ message: "Cannot cancel booking" });
		}

		return res
			.status(201)
			.json({ message: "Itinerary booking cancelled successfully" });
	} catch (error) {
		next(error);
	}
};

export const removeBookmarkItinerary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const itineraryId = req.params.id;
		const touristId = req.headers.userid;

		if (!touristId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		if (!itineraryId) {
			return res
				.status(400)
				.json({ message: "Itinerary ID is required" });
		}

		const removeBookmarkResult =
			await itineraryService.removeBookmarkItinerary(
				itineraryId,
				touristId.toString(),
			);
		if (!removeBookmarkResult) {
			return res.status(400).json({ message: "Cannot remove bookmark" });
		}

		return res
			.status(201)
			.json({ message: "Itinerary bookmark removed successfully" });
	} catch (error) {
		next(error);
	}
};


export const flagItinerary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const itineraryId = req.params.id;

		if (!itineraryId) {
			throw new HttpError(400, "itinerary id is required");
		}
		const itinerary = await itineraryService.flagItinerary(itineraryId);

		res.status(200).send(itinerary);
	} catch (error) {
		next(error);
	}
};

export const toggleStatus = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const itineraryId = req.params.id;

		if (!itineraryId) {
			throw new HttpError(400, "itinerary id is required");
		}
		const itinerary = await itineraryService.toggleStatus(itineraryId);

		res.status(200).send(itinerary);
	} catch (error) {
		next(error);
	}
};
