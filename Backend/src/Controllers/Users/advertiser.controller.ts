import { NextFunction, Request, Response } from "express";

import HttpError from "../../Errors/HttpError";
import * as advertiserService from "../../Services/Users/advertiser.service";

export const createAdvertiser = async (
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
		const user = await advertiserService.createAdvertiser(
			username,
			email,
			password,
		);
		res.status(201).send(user);
	} catch (error) {
		next(error);
	}
};

export const getAdvertiser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		if (!id) {
			throw new HttpError(400, "id is required");
		}
		const advertiser = await advertiserService.getAdvertiserById(id);

		if (!advertiser) {
			throw new HttpError(404, "advertiser not found");
		}
		res.status(200).send(advertiser);
	} catch (error) {
		next(error);
	}
};

export const getAdvertisers = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await advertiserService.getAdvertisers();
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};
export const updateAdvertiser = async (
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
		const adv = await advertiserService.updateAdvertiser(
			id,
			userid.toString(),
			req.body,
		);
		return res.status(200).send(adv);
	} catch (error) {
		next(error);
	}
};
export const deleteAdvertiser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;

	try {
		if (!id) {
			throw new HttpError(400, "id is required");
		}
		const deletedAdvertiser = await advertiserService.deleteAdvertiser(id);
		res.status(200).send("advertiser deleted successfully");
	} catch (error) {
		next(error);
	}
};

export const viewActivities = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;

	try {
		if (!id) {
			throw new HttpError(400, "Advertiser Id is Required");
		}
		const activities = await advertiserService.viewActivities(id);
		res.status(200).send(activities);
	} catch (error) {
		next(error);
	}
};

export const softDeleteAdvertiser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;
	try {
		if (!id) {
			throw new HttpError(400, "id is required");
		}
		await advertiserService.softDeleteAdvertiser(id);
		res.status(200).send("Advertiser deleted successfully");
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

		const salesReport = await advertiserService.report(userid, {
			date: req.query.date?.toString(),
			ActivityId: req.query.activityId?.toString(),
		});

		if (salesReport.data.length == 0) {
			throw new HttpError(404, "No Sales Found");
		}
		res.status(200).send(salesReport);
	} catch (error) {
		next(error);
	}
};

export const touristReport = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.params.id;

		if (!userId) {
			throw new HttpError(400, "Itinerary Id is required");
		}

		const tourists = await advertiserService.report(userId, {
			date: req.query.date?.toString(),
		});

		if (tourists.data.length == 0) {
			throw new HttpError(404, "No Tourists Found");
		}
		res.status(200).send(tourists);
	} catch (error) {
		next(error);
	}
};
