import { NextFunction, Request, Response } from "express";

import HttpError from "../../Errors/HttpError";
import * as sellerService from "../../Services/Users/seller.service";

export const createSeller = async (
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

		const seller = await sellerService.createSeller(
			username,
			email,
			password,
		);
		res.status(201).send(seller);
	} catch (error) {
		next(error);
	}
};

export const getSeller = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		if (!id) {
			throw new HttpError(400, "Id is Required");
		}
		const seller = await sellerService.getSellerById(id);
		res.status(200).send(seller);
	} catch (error) {
		next(error);
	}
};

export const getSellers = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await sellerService.getSellers();
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};
export const updateSeller = async (
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

		const seller = await sellerService.updateSeller(
			id,
			userid.toString(),
			req.body,
		);

		res.status(200).send(seller);
	} catch (error) {
		next(error);
	}
};
export const deleteSeller = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;

	try {
		if (!id) {
			throw new HttpError(400, "Id is Required");
		}
		//maybe we need to add checker here based on the flow of the page
		await sellerService.deleteSeller(id);
		res.status(200).send("Seller deleted successfully");
	} catch (error) {
		next(error);
	}
};

export const softDeleteSeller = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;
	try {
		if (!id) {
			throw new HttpError(400, "Id is Required");
		}
		await sellerService.softDeleteSeller(id);
		res.status(200).send("Seller deleted successfully");
	} catch (error) {
		next(error);
	}
};
