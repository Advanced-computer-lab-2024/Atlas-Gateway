import { NextFunction, Request, Response } from "express";

import HttpError from "../../Errors/HttpError";
import * as governorService from "../../Services/Users/governor.service";

export const createGovernor = async (
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

		const governor = await governorService.createGovernor(
			username,
			email,
			password,
		);

		res.status(201).json(governor);
	} catch (error) {
		next(error);
	}
};

export const getGovernors = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const governors = await governorService.getGovernors();
		res.status(200).json(governors);
	} catch (error) {
		next(error);
	}
};

export const getGovernor = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		if (!id) {
			throw new HttpError(400, "id is required");
		}

		const governor = await governorService.getGovernorById(id);

		if (!governor) {
			throw new HttpError(404, "governor not found");
		}

		res.status(200).json(governor);
	} catch (error) {
		next(error);
	}
};

// update governer
export const updateGovernor = async (
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
			throw new HttpError(400, "Logged in User Id is Required");
		}

		const governor = await governorService.updateGovernor(
			id,
			userid.toString(),
			req.body,
		);

		res.status(200).send(governor);
	} catch (error) {
		next(error);
	}
};

export const getHistoricalLocations = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		if (!id) {
			throw new HttpError(400, "id is required");
		}

		const locations = await governorService.viewHistoricalLocations(id);

		res.status(200).json(locations);
	} catch (error) {
		next(error);
	}
};

export const deleteGovernor = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).send("Id is Required");
		}

		await governorService.deleteGovernor(id);

		res.status(200).send("Deleted successfully");
	} catch (error) {
		next(error);
	}
};
