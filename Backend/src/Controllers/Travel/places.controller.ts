import { NextFunction, Request, Response } from "express";
import { PipelineStage, Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Places } from "../../Models/Travel/places.model";
import { Governor } from "../../Models/Users/governor.model";
import AggregateBuilder from "../../Services/Operations/aggregation.service";
import * as placeService from "../../Services/Travel/places.service";

export const createPlace = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const governorId = req.headers.userid;

		if (!governorId) {
			throw new HttpError(400, "Governor id is required");
		}

		const place = placeService.createPlace(governorId.toString(), req.body);
		res.status(200).send(place);
	} catch (error) {
		next(error);
	}
};

export const getPlaces = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await placeService.getPlaces(req.query);
		const response = {
			data: result[0].data,
			metaData: {
				page: req.query.page || 1,
				total: result[0].total[0].count,
				pages: Math.ceil(
					result[0].total[0].count / (Number(req.query.limit) || 10),
				),
			},
		};

		res.status(200).send(response);
	} catch (error) {
		next(error);
	}
};

export const getPlacesByUserId = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const governerId = req.headers.userid;
		if (!governerId) {
			throw new HttpError(400, "Governer ID is required");
		}

		const result = await placeService.getPlacesByUserId(
			governerId.toString(),
			req.query,
		);

		const response = {
			data: result[0].data,
			metaData: {
				page: req.query.page || 1,
				total: result[0].total[0].count,
				pages: Math.ceil(
					result[0].total[0].count / (Number(req.query.limit) || 10),
				),
			},
		};

		res.status(200).send(response);
	} catch (error) {
		next(error);
	}
};

export const getPlaceById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		if (!id) {
			throw new HttpError(400, "id is required");
		}

		const place = await placeService.getPlaceById(id);

		res.status(200).send(place);
	} catch (error) {
		next(error);
	}
};

export const updatePlace = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		if (!id) {
			throw new HttpError(400, "id is required");
		}

		const place = await placeService.updatePlace(id.toString(), req.body);

		res.status(200).send(place);
	} catch (error) {
		next(error);
	}
};

export const deletePlace = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		await placeService.deletePlace(id);
		res.status(200).send("Itinerary deleted Successfully");
	} catch (error) {
		next(error);
	}
};
