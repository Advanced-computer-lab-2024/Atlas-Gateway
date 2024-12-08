import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { ITag } from "../../Models/Travel/tag.model";
import { Tourist } from "../../Models/Users/tourist.model";
import * as activityService from "../../Services/Travel/activity.service";

export const createActivities = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const advertisorId = req.headers.userid;

		if (!advertisorId) {
			throw new HttpError(400, "Tour Guide ID is required");
		}

		const activity = await activityService.createActivity(
			req.body,
			advertisorId.toString(),
		);
		res.status(201).json(activity);
	} catch (error) {
		next(error);
	}
};

export const getActivityById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		if (!id) {
			throw new HttpError(400, "id is Required");
		}

		const activity = await activityService.getActivityById(id);

		res.status(200).send(activity);
	} catch (error) {
		next(error);
	}
};

export const getActivitybyCreator = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.headers.userid;

		if (!userId) {
			return res
				.status(400)
				.json({ message: "Advertisor ID is required" });
		}

		const result = await activityService.getActivitybyUserId(
			userId.toString(),
			req.body,
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

export const getActivities = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const usertype = req.headers.usertype as string;

		if (!usertype) {
			throw new HttpError(400, "User type is required");
		}

		let preferredTags: Types.ObjectId[] | undefined = undefined;
		if (usertype === "tourist") {
			preferredTags = (await Tourist.findOne({ _id: req.headers.userid }))
				?.preferredTags as Types.ObjectId[];
		}

		const result = await activityService.getActivities(usertype, {
			...req.query,
			preferredTags,
		});

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

export const updateActivityById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		if (!id) {
			throw new HttpError(400, "id is required");
		}

		const activity = await activityService.updateActivity(id, req.body);

		res.status(200).send(activity);
	} catch (error) {
		next(error);
	}
};

export const deleteActivityById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		if (!id) {
			throw new HttpError(400, "id is required");
		}
		await activityService.deleteActivity(id);
		res.status(200).send("activity deleted successfully");
	} catch (error) {
		next(error);
	}
};

export const bookActivity = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const activityId = req.params.id;
		const touristId = req.headers.userid;
		const { paymentIntentId, paymentType, amount } = req.body;

		if (!touristId) {
			throw new HttpError(400, "User ID is required");
		}

		if (!activityId) {
			throw new HttpError(400, "Activity ID is required");
		}

		const bookingResult = await activityService.bookActivity(
			activityId,
			paymentType,
			amount,
			paymentIntentId,
			touristId.toString(),
		);

		if (!bookingResult) {
			return res.status(400).json({ message: "Cannot book Activity" });
		}

		return res
			.status(201)
			.json({ message: "Activity booked successfully" });
	} catch (error) {
		next(error);
	}
};

export const bookmarkActivity = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const activityId = req.params.id;
		const touristId = req.headers.userid;

		if (!touristId) {
			throw new HttpError(400, "User ID is required");
		}
		if (!activityId) {
			throw new HttpError(400, "Activity ID is required");
		}
		const bookmarkResult = await activityService.bookmarkActivity(
			activityId,
			touristId.toString(),
		);
		if (!bookmarkResult) {
			throw new HttpError(400, "Cannot bookmark Activity");
		}
		return res.status(201).json({ message: "Activity Bookmarked" });
	} catch (error) {
		next(error);
	}
};

export const cancelBookingActivity = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const activityId = req.params.id;
		const touristId = req.headers.userid;

		if (!touristId) {
			throw new HttpError(400, "User ID is required");
		}

		if (!activityId) {
			throw new HttpError(400, "Activity ID is required");
		}

		const cancelBookingResult = await activityService.cancelBookingActivity(
			activityId,
			touristId.toString(),
		);

		if (!cancelBookingResult) {
			throw new HttpError(400, "Cannot cancel Activity");
		}

		return res.status(201).json({ message: " Activity Cancelled" });
	} catch (error) {
		next(error);
	}
};

export const removeBookmarkActivity = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const activityId = req.params.id;
		const touristId = req.headers.userid;

		if (!touristId) {
			throw new HttpError(400, "User ID is required");
		}
		if (!activityId) {
			throw new HttpError(400, "Activity ID is required");
		}
		const removeBookmarkResult =
			await activityService.removeBookmarkActivity(
				activityId,
				touristId.toString(),
			);
		if (!removeBookmarkResult) {
			throw new HttpError(400, "Cannot remove bookmarked Activity");
		}
		return res
			.status(201)
			.json({ message: "Activity removed from bookmarks" });
	} catch (error) {
		next(error);
	}
};
