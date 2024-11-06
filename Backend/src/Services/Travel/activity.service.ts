import mongoose, { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Activity, IActivity } from "../../Models/Travel/activity.model";
import * as advertiserService from "../../Services/Users/advertiser.service";
import AggregateBuilder from "../Operations/aggregation.service";
import { cancelActivity } from "../Users/tourist.service";
import { Tourist } from "@/Models/Users/tourist.model";

export const createActivity = async (
	activity: IActivity,
	createdBy: string,
) => {
	if (!Types.ObjectId.isValid(createdBy)) {
		throw new HttpError(400, "Invalid Advertiser ID");
	}

	// Start a session for transaction management
	const session = await mongoose.startSession();

	try {
		session.startTransaction();

		// Create the new activity
		const newActivity = new Activity({
			...activity,
			createdBy: new Types.ObjectId(createdBy),
		});

		await newActivity.save({ session }); // Save to generate the ID

		// Link activity ID to the advertiser's activities array
		const advertiser = await advertiserService.getAdvertiserById(createdBy);

		if (!advertiser) {
			await session.abortTransaction();
			throw new HttpError(404, "Advertiser not found");
		}

		advertiser.activities.push(newActivity.id); // Add the activity ID to the array
		await advertiser.updateOne({ session });

		await session.commitTransaction();

		return newActivity;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

export const getActivities = async (query: any) => {
	const pipeline = [
		//need to join the tags and category collections to get the name of the tags and category
		{
			$lookup: {
				from: "tags",
				localField: "tags",
				foreignField: "_id",
				as: "tags",
			},
		},
		{
			$lookup: {
				from: "categories",
				localField: "categories",
				foreignField: "_id",
				as: "categories",
			},
		},
		...AggregateBuilder(
			query,
			["name", "tags.name", "categories.name"], // Search fields
		),
	];

	const result = await Activity.aggregate(pipeline);

	if (result[0].data.length === 0) {
		throw new HttpError(404, "No matching Activities Found");
	}

	return result;
};
export const getActivityById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is required");
	}

	const activity = await Activity.findById(id)
		.populate("tags")
		.populate("categories");
	if (!activity) {
		throw new HttpError(404, "cant find Activity");
	}

	return activity;
};
export const updateActivity = async (id: string, newActivity: IActivity) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}
	const activity = await Activity.findById(id);

	if (!activity) {
		throw new HttpError(404, "cant find Activity");
	}
	activity.set(newActivity);
	await activity.save();

	return activity;
};
export const deleteActivity = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Valid activity ID is required");
	}

	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		// Find the activity to check the createdBy field
		const activity = await Activity.findById(id).session(session);
		if (!activity) {
			throw new HttpError(404, "Activity not found");
		}

		// Extract the advertiser ID from the createdBy field in the activity
		const advertiserId = activity.createdBy;

		// Update the advertiser's activities array
		const advertiser = await advertiserService.getAdvertiserById(
			advertiserId.toString(),
		);
		if (!advertiser) {
			throw new HttpError(404, "Advertiser not found");
		}

		// Remove the activity ID from the advertiser's activities array
		advertiser.activities = advertiser.activities.filter(
			(activityId) => !activityId.equals(id),
		);
		await advertiser.updateOne({ session });
		// Delete the activity
		await activity.deleteOne({ session });

		await session.commitTransaction();

		return activity;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

export const getActivitybyUserId = async (id: string, query: any) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid Advertisor ID");
	}

	const pipeline = [
		//need to join the tags and category collections to get the name of the tags and category
		{
			$lookup: {
				from: "tags",
				localField: "tags",
				foreignField: "_id",
				as: "tags",
			},
		},
		{
			$lookup: {
				from: "categories",
				localField: "categories",
				foreignField: "_id",
				as: "categories",
			},
		},
		{
			$match: {
				createdBy: new Types.ObjectId(id),
			},
		},
		...AggregateBuilder(
			query,
			["name", "tags.name", "categories.name"], // Search fields
		),
	];

	const result = await Activity.aggregate(pipeline);

	if (result[0].data.length === 0) {
		throw new HttpError(404, "No matching Activities Found");
	}

	return result;
};

export const bookActivity = async (activityId: string, touristId: string) => {
	const activity = await Activity.findById(activityId);
	if (!activity) {
		throw new HttpError(404, "Activity not found");
	}

	const tourist = await Tourist.findById(touristId);

	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	activity.tourists.push(tourist.id);

	activity.numberOfBookings++;

	const result = await activity.save();

	return result;
};

export const cancelBookingActivity = async (activityId: string, touristId: string) => {
	const activity = await Activity.findById(activityId);
	if (!activity) {
		throw new HttpError(404, "Activity not found");
	}

	const currentDate = new Date();
	const millisecondsBeforeActivity = activity.dateTime.getTime() - currentDate.getTime();
	const hoursBeforeActivity = millisecondsBeforeActivity / (1000 * 3600);

	if (hoursBeforeActivity < 48) {
		throw new HttpError(400, "Cannot cancel within 48 hours of activity.");
	}

	const tourist = await Tourist.findById(touristId);

	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	if (!activity.tourists.includes(tourist.id)) {
		throw new HttpError(404, "Activity not found in the tourist's list");
	}

	const removed = await activity.updateOne({
		$pull: { tourists: touristId }
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel Activity booking");
	}

	let touristResult;
	try {
		touristResult = await cancelActivity(touristId, activity.id);
	} catch (error) {
		throw new HttpError(500, "Failed to cancel tourist booking.");
	}
	if (!touristResult) {
		throw new HttpError(404, "Tourist not found");
	}

	activity.numberOfBookings--;

	const result = await activity.save();
	return result;
};
