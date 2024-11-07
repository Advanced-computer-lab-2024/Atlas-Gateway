import mongoose, { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Activity, IActivity } from "../../Models/Travel/activity.model";
import * as advertiserService from "../../Services/Users/advertiser.service";
import AggregateBuilder from "../Operations/aggregation.service";
import * as touristService from "../Users/tourist.service";

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
			throw new HttpError(404, "Advertiser not found");
		}

		// Push the new activity ID to the advertiser's activities array
		await advertiser.updateOne(
			{ $push: { activities: newActivity._id } }, // Update data
			{ session }, // Pass session here
		);

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
	const activity = await getActivityById(activityId);
	if (!activity) {
		throw new HttpError(404, "Activity not found");
	}

	const tourist = await touristService.bookActivity(touristId, activityId);

	await activity.updateOne({
		$push: { tourists: tourist.id },
		$inc: { numberOfBookings: 1 },
	});

	return activity;
};

export const cancelBookingActivity = async (
	activityId: string,
	touristId: string,
) => {
	const activity = await getActivityById(activityId);
	if (!activity) {
		throw new HttpError(404, "Activity not found");
	}
	if (!activity.tourists.includes(new Types.ObjectId(touristId))) {
		throw new HttpError(404, "Tourist not found in the activity's list");
	}

	const currentDate = new Date();
	const millisecondsBeforeActivity =
		activity.dateTime.getTime() - currentDate.getTime();
	const hoursBeforeActivity = millisecondsBeforeActivity / (1000 * 3600);
	if (hoursBeforeActivity < 48) {
		throw new HttpError(400, "Cannot cancel within 48 hours of activity.");
	}

	const removedActivity = await activity.updateOne({
		$pull: { tourists: touristId },
		$inc: { numberOfBookings: -1 },
	});

	if (removedActivity.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel activity booking");
	}

	await touristService.cancelActivity(touristId, activityId);

	return removedActivity;
};

export const softDeleteActivity = async (id: string) => {
	const activity = await getActivityById(id);

	if (!activity) {
		throw new HttpError(404, "Activity not found");
	}

	await activity.updateOne({ isDeleted: true });

	return activity;
};
