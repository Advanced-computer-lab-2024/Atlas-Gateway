import { NextFunction, Request, Response } from "express";

import HttpError from "../../Errors/HttpError";
import * as activityService from "../../Services/Travel/activity.service";
import { addBookedActivity, cancelActivity } from "@/Services/Users/tourist.service";
import { Activity } from "@/Models/Travel/activity.model";
import { Types } from "mongoose";

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

export const getActivitybyUserId = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const tourGuideId = req.headers.userid;

		if (!tourGuideId) {
			return res
				.status(400)
				.json({ message: "Advertisor ID is required" });
		}

		const result = await activityService.getActivitybyUserId(
			tourGuideId.toString(),
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
		const result = await activityService.getActivities(req.query);

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

export const bookActivity = async (req: Request, res: Response) => {
	try {
		const activityId = req.params.activityId;
		const touristId = req.headers.userId;

		if (!touristId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		if (!Types.ObjectId.isValid(activityId)) {
			return res.status(400).json({ message: "Invalid Activity ID" });
		}

		const activity = await Activity.findById(activityId);
		if (!activity) {
			return res.status(404).json({ message: "Activity not found" });
		}

		const tId = touristId.toString();

		const tourist = await addBookedActivity(tId, activity.id);

		if (!tourist) {
			return res.status(500).json({ message: "Error booking Activity" });
		}

		

		return res.status(201).json({ message: "Activity booked successfully" });
	} catch (error) {
		return res.status(500).json({ message: "Error booking Activity" });
	}
};

export const cancelBookingActivity = async (req: Request, res: Response) => {
	try {
		const activityId = req.params.activityId;
		const touristId = req.headers.touristId;

		if (!touristId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		if (!Types.ObjectId.isValid(activityId)) {
			return res.status(400).json({ message: "Invalid Activity ID" });
		}

		const activity = await Activity.findById(activityId);
		if (!activity) {
			return res.status(404).json({ message: "Activity not found" });
		}

		const tId = touristId.toString();

		const currentDate = new Date();
		const millisecondsBeforeActivity = activity.dateTime.getTime() - currentDate.getTime();
		const hoursBeforeActivity = millisecondsBeforeActivity / (1000 * 3600);

		if (hoursBeforeActivity >= 48) {
			
			const tourist = await cancelActivity(tId, activity.id);

			if (!tourist) {
				return res.status(505).send("Tourist didn't book this activity");
			}

			activity.numberOfBookings--;

			await activity.save();

			return res.status(200).send("Booking canceled successfully");
		}
		return res.status(505).send("Cannot cancel this Booking");
	} catch (error) {
		return res.status(505).send("Error canceling this Booking");
	}
};