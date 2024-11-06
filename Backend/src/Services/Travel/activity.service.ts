import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { IActivity, Activity } from "../../Models/Travel/activity.model";

export const getActivityById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}
	const activity = await Activity.findById(id);
	return Activity;
};

export const getActivitys = async () => {
	const Activitys = await Activity.find();
	return Activitys;
};

export const updateActivity = async (id: string, newActivity: IActivity) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Activity id is not valid");
	}

	const activity = await Activity.findByIdAndUpdate(id, newActivity, {
		new: true,
	});
	return Activity;
};

export const bookActivity = async (activityId: string, touristId: string) => {
	
}

export const deleteActivity = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Id is Invalid and Required");
	}
	const activity = await Activity.findByIdAndDelete(id);

	return Activity;
};

export const getActivitysByUsername = async (username: string) => {};
