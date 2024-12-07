import { NextFunction, Request, Response } from "express";

import HttpError from "../../Errors/HttpError";
import * as transportation_advertiserService from "../../Services/Users/transportation_advertiser.service";

export const createTransportationAdvertiser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			throw new HttpError(
				400,
				"username, email and password are required",
			);
		}
		const user =
			await transportation_advertiserService.createTransportationAdvertiser(
				username,
				email,
				password,
			);
		res.status(201).send(user);
	} catch (error) {
		next(error);
	}
};

export const getTransportationAdvertiser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		if (!id) {
			throw new HttpError(400, "id is required");
		}
		const transportation_advertiser =
			await transportation_advertiserService.getTransportationAdvertiserById(
				id,
			);

		if (!transportation_advertiser) {
			throw new HttpError(404, "transportation_advertiser not found");
		}
		res.status(200).send(transportation_advertiser);
	} catch (error) {
		next(error);
	}
};

export const getTransportationAdvertisers = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result =
			await transportation_advertiserService.getTransportationAdvertisers();
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};
export const updateTransportationAdvertiser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;
	const userid = req.headers.userid;
	try {
		if (!id) {
			throw new HttpError(400, "Id is Required");
		}
		if (!userid) {
			throw new HttpError(400, "Logged in User id Required");
		}
		const adv =
			await transportation_advertiserService.updateTransportationAdvertiser(
				id,
				userid.toString(),
				req.body,
			);
		return res.status(200).send(adv);
	} catch (error) {
		next(error);
	}
};
export const deleteTransportationAdvertiser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;

	try {
		if (!id) {
			throw new HttpError(400, "id is required");
		}
		const deletedTransportationAdvertiser =
			await transportation_advertiserService.deleteTransportationAdvertiser(
				id,
			);
		res.status(200).send("transportation_advertiser deleted successfully");
	} catch (error) {
		next(error);
	}
};

export const Report = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userid = req.params.id;
		if (!userid) {
			throw new HttpError(400, "User Id is required");
		}

		const salesReport = await transportation_advertiserService.report(
			userid,
			{
				date: req.query.date?.toString(),
				TransportationId: req.query.transportationId?.toString(),
			},
		);

		if (salesReport.data.length == 0) {
			throw new HttpError(404, "No Sales Found");
		}
		res.status(200).send(salesReport);
	} catch (error) {
		next(error);
	}
};
