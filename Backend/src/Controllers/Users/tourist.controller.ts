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

export const redeemPoints = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		if (!id) {
			throw new HttpError(400, "Tourist id is required");
		}
		await touristService.redeemPoints(id);
		res.status(200).send("Points redeemed successfully");
	} catch (error) {
		next(error);
	}
};
export const viewWallet = async (req: Request, res: Response) => {
	try {
		const { touristId } = req.body;
		res.status(200).json(touristService.viewWallet(touristId));
	} catch (error) {
		res.status(500).send(error);
	}
};

export const viewUpcomingActivities = async (req: Request, res: Response) => {
	try {
		const touristId = req.params.id;
		const activities =
			await touristService.viewUpcomingActivities(touristId);
		res.status(200).send(activities);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const viewPastActivities = async (req: Request, res: Response) => {
	try {
		const touristId = req.params.id;
		const activities = await touristService.viewPastActivities(touristId);
		res.status(200).send(activities);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const viewUpcomingItineraries = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const touristId = req.params.id;
		const itineraries =
			await touristService.viewUpcomingItineraries(touristId);
		res.status(200).send(itineraries);
	} catch (error) {
		next(error);
	}
};

export const viewPastItineraries = async (req: Request, res: Response) => {
	try {
		const touristId = req.params.id;
		const itineraries = await touristService.viewPastItineraries(touristId);
		res.status(200).send(itineraries);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const requestActivityNotification = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { touristId, activityId } = req.body;
		const activity = await touristService.requestActivityNotification(
			activityId,
			touristId,
		);
		res.status(200).send(activity);
	} catch (error) {
		next(error);
	}
};

export const unRequestActivityNotification = async(
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { touristId, activityId } = req.body;
		const activity = await touristService.unrequestActivityNotification(
			activityId,
			touristId,
		);
		res.status(200).send(activity);
	} catch (error) {
		next(error);
	}
};
	

export const requestItineraryNotification = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { touristId, itineraryId } = req.body;
		const itinerary = await touristService.requestItineraryNotification(
			itineraryId,
			touristId,
		);
		res.status(200).send(itinerary);
	} catch (error) {
		next(error);
	}
};

export const unRequestItineraryNotification = async(
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { touristId, itineraryId } = req.body;
		const itinerary = await touristService.unrequestItineraryNotification(
			itineraryId,
			touristId,
		);
		res.status(200).send(itinerary);
	} catch (error) {
		next(error);
	}
}


export const addProductToCart = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		if (!id) {
			throw new HttpError(400, "Tourist id is required");
		}
		const productId = req.body.productId;
		await touristService.addProductToCart(id, productId);
		res.status(200).send("Product added to cart successfully");
	} catch (error) {
		next(error);
	}
};

export const removeProductFromCart = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		if (!id) {
			throw new HttpError(400, "Tourist id is required");
		}
		const productId = req.body.productId;
		await touristService.removeProductFromCart(id, productId);
		res.status(200).send("Product removed from cart successfully");
	} catch (error) {
		next(error);
	}
};

export const updateProductQuantity = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		if (!id) {
			throw new HttpError(400, "Tourist id is required");
		}
		const productId = req.body.productId;
		const quantity = req.body.quantity;
		await touristService.updateProductQuantity(id, productId, quantity);
		res.status(200).send("Product quantity updated successfully");
	} catch (error) {
		next(error);
	}
};
