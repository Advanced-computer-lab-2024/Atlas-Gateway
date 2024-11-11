import { th } from "date-fns/locale";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import * as transportationService from "../../Services/Travel/transportation.service";

//Create a new product entry
export const createTransportation = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const transportation_advertiserId = req.headers.userid;

		if (!transportation_advertiserId) {
			return res
				.status(400)
				.json({ message: "Transportation Advertiser ID is required" });
		}

		const transportationCreated =
			await transportationService.createTransportation(
				req.body,
				transportation_advertiserId.toString(),
			);

		if (!transportationCreated) {
			return res
				.status(400)
				.json({ message: "Error creating Transportation" });
		}

		await transportationCreated.save();
		return res.status(200).send(transportationCreated);
	} catch (error) {
		next(error);
	}
};

export const getTransportation = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		if (!id) {
			res.status(400).json({ error: "Transportation ID is required" });
		}

		const transportation =
			await transportationService.getTransportationById(id);

		if (!transportation) {
			res.status(404).send("Transportation not found");
		}

		res.status(200).send(transportation);
	} catch (error) {
		next(error);
	}
};

export const getTransportationByUserId = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const userid = req.headers.userid;
	try {
		if (!userid) {
			throw new HttpError(400, "User ID is required");
		}

		const result = await transportationService.getTransportationByUserId(
			userid.toString(),
			req.query,
		);

		if (!result) {
			return res.status(404).send("No Transportation found");
		}

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

		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const getTransportations = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.headers.userid;
		const type = req.headers.usertype;
		if (!userId) {
			throw new HttpError(400, "User ID is required");
		}
		if (!type) {
			throw new HttpError(400, "User Type is required");
		}
		const result = await transportationService.getTransportations(
			type.toString(),
			req.query,
		);
		if (!result) {
			return res.status(404).send("No Transportations found");
		}
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

export const updateTransportationById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const transportationId = req.params.id;

		if (!Types.ObjectId.isValid(transportationId)) {
			return res
				.status(400)
				.json({ message: "Invalid Transportation ID" });
		}

		const transportation = await transportationService.updateTransportation(
			transportationId,
			req.body,
		);

		res.status(200).send(transportation);
	} catch (error) {
		next(error);
	}
};

export const deleteTransportation = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		if (!Types.ObjectId.isValid(id)) {
			return res
				.status(400)
				.json({ message: "Invalid Transportation ID" });
		}

		const transportation =
			await transportationService.deleteTransportation(id);

		if (!transportation) {
			return res.status(404).send("Transportation not found");
		}

		res.status(200).send("Transportation deleted Successfully");
	} catch (error) {
		next(error);
	}
};

export const bookTransportationById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const transportationId = req.params.id;
		const touristId = req.headers.userid;

		if (!touristId) {
			throw new HttpError(400, "Tourist ID is required");
		}

		if (!transportationId) {
			throw new HttpError(400, "Transportation ID is required");
		}

		const transportation = await transportationService.bookTransportation(
			transportationId,
			touristId.toString(),
		);

		if (!transportation) {
			throw new HttpError(500, "Cannot book Transportation");
		}

		return res
			.status(201)
			.json({ message: "Transportation booked successfully" });
	} catch (error) {
		next(error);
	}
};

export const cancelBookingTransportationById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const transportationId = req.params.id;
		const touristId = req.headers.userid;

		if (!touristId) {
			throw new HttpError(400, "Tourist ID is required");
		}

		if (!transportationId) {
			throw new HttpError(400, "Transportation ID is required");
		}
		const cancelBookingResult =
			await transportationService.cancelBookingTransportation(
				transportationId,
				touristId.toString(),
			);

		if (!cancelBookingResult) {
			throw new HttpError(500, "Cannot cancel booking");
		}

		return res
			.status(201)
			.json({ message: "Transportation booking canceled successfully" });
	} catch (error) {
		next(error);
	}
};
