import { NextFunction, Request, Response } from "express";

import HttpError from "../../Errors/HttpError";
import * as tourGuideService from "../../Services/Users/tourGuide.service";

export const createTourGuide = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			throw new HttpError(
				400,
				"Username , Email and Password is required",
			);
		}
		const user = await tourGuideService.createTourGuide(
			username,
			email,
			password,
		);
		res.status(201).send(user);
	} catch (error) {
		next(error);
	}
};
export const getTourGuide = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;
	try {
		if (!id) {
			throw new HttpError(400, "id is required");
		}

		const tourGuide = await tourGuideService.getTourGuideById(id);

		res.status(200).send(tourGuide);
	} catch (error) {
		next(error);
	}
};

export const getTourGuides = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const users = await tourGuideService.getTourGuides();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const updateTourGuide = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;
	const userid = req.headers.userid;
	try {
		if (!id) {
			return res.status(400).send("Id is Required");
		}
		if (!userid) {
			throw new HttpError(400, "Logged in User id is required");
		}
		const tourGuide = await tourGuideService.updateTourGuide(
			id,
			userid.toString(),
			req.body,
		);
		res.status(200).json(tourGuide);
	} catch (error) {
		next(error);
	}
};
export const deleteTourGuide = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;
	try {
		if (!id) {
			throw new HttpError(400, "id is required");
		}
		await tourGuideService.deleteTourGuide(id);

		res.status(200).send("tourGuide deleted successfully");
	} catch (error) {
		next(error);
	}
};

export const softDeleteTourGuide = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;
	try {
		if (!id) {
			throw new HttpError(400, "id is required");
		}
		await tourGuideService.softDeleteTourGuide(id);
		res.status(200).send("tourGuide deleted successfully");
	} catch (error) {
		next(error);
	}
};

export const salesReport = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userid = req.params.id;
		if (!userid) {
			throw new HttpError(400, "User Id is required");
		}

		const sales = await tourGuideService.salesReport(
			userid,
			req.query.id?.toString(),
			req.query.date?.toString(),
		);

		if (!sales) {
			throw new HttpError(404, "No Sales Found");
		}
		res.status(200).send({
			sales: sales,
		});
	} catch (error) {
		next(error);
	}
};
