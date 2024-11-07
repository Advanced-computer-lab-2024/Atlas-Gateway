import { NextFunction, Request, Response } from "express";

import HttpError from "../../Errors/HttpError";
import * as touristService from "../../Services/Users/tourist.service";

export const createTourist = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userName, email, password, mobile, nationality, dob, job } =
			req.body;
		const user = await touristService.createTourist(
			userName,
			email,
			password,
			mobile,
			nationality,
			dob,
			job,
		);
		res.status(201).send(user);
	} catch (error) {
		next(error);
	}
};

export const getTourist = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		if (!id) {
			throw new HttpError(400, "Tourist Id is required");
		}

		const tourist = await touristService.getTouristById(id);
		res.status(200).send(tourist);
	} catch (error) {
		next(error);
	}
};

export const getTourists = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const users = await touristService.getTourists();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const updateTourist = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;
	try {
		if (!id) {
			throw new HttpError(400, "Id is required");
		}

		const touristData = await touristService.updateTourist(id, req.body);
		res.status(200).send(touristData);
	} catch (error) {
		next(error);
	}
};
export const deleteTourist = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;
	try {
		if (!id) {
			throw new HttpError(400, "Tourist id is required");
		}
		await touristService.deleteTourist(id);
		res.status(200).send("Tourist deleted successfully");
	} catch (error) {
		next(error);
	}
};

export const softDeleteTourist = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;
	try {
		if (!id) {
			throw new HttpError(400, "Tourist id is required");
		}
		await touristService.softDeleteTourist(id);
		res.status(200).send("Tourist deleted successfully");
	} catch (error) {
		next(error);
	}
};
