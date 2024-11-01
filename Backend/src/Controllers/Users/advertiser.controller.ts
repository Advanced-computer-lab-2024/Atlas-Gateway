import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Admin } from "../../Models/Users/admin.model";
import { Advertiser } from "../../Models/Users/advertiser.model";
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
