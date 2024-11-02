import mongoose, { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Activity, IActivity } from "../../Models/Travel/activity.model";
import * as advertiserService from "../../Services/Users/advertiser.service";
import AggregateBuilder from "../Operations/aggregation.service";

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
		await advertiser.save({ session });

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
		throw new HttpError(400, "id is required");
	}
	const activity = await Activity.findByIdAndDelete(id);
	if (!activity) {
		throw new HttpError(404, "activity not found");
	}

	return activity;
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

	return result;
};
