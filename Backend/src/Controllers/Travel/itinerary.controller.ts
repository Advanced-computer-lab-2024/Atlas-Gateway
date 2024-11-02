import { NextFunction, Request, Response } from "express";

import HttpError from "../../Errors/HttpError";
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
