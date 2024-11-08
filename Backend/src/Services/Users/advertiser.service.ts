import { fi } from "date-fns/locale";
import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Transportation } from "../../Models/Travel/transportation.model";
import { Advertiser, IAdvertiser } from "../../Models/Users/advertiser.model";
import { hashPassword } from "../Auth/password.service";
import uniqueUsername from "../Auth/username.service";
import * as activityService from "../Travel/activity.service";
import * as adminService from "./admin.service";

export const createAdvertiser = async (
	username: string,
	email: string,
	password: string,
) => {
	const resultUnique = await uniqueUsername(username);
	if (!resultUnique) {
		throw new HttpError(400, "Username should be unique");
	}
	const hashedPassword = await hashPassword(password);
	const adv = await Advertiser.create({
		username: username,
		email: email,
		password: hashedPassword,
	});
	return adv;
};

export const getAdvertisers = async () => {
	return await Advertiser.find();
};

export const getAdvertiserById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}
	const adv = await Advertiser.findById(id);

	return adv;
};

export const updateAdvertiser = async (
	id: string,
	userId: string,
	newAdvertiser: Partial<IAdvertiser>,
) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}
	if (!Types.ObjectId.isValid(userId)) {
		throw new HttpError(400, "User id is invalid");
	}
	const admin = await adminService.getAdminById(userId);
	if (!admin) {
		const advertiser = await getAdvertiserById(id);
		const overRide = true
			? Object.keys(newAdvertiser)[0] == "idPath" ||
				Object.keys(newAdvertiser)[0] == "taxCardPath" ||
				Object.keys(newAdvertiser)[0] == "imagePath"
			: false;
		if (!advertiser || (!advertiser.isVerified && !overRide)) {
			throw new HttpError(401, "User is not Verified");
		}
	}
	const advertiser = await Advertiser.findByIdAndUpdate(id, newAdvertiser, {
		new: true,
	});
	return advertiser;
};

export const deleteAdvertiser = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const deleteAdvertiser = await Advertiser.findByIdAndDelete(id);

	if (!deleteAdvertiser) {
		throw new HttpError(404, "advertiser not found");
	}
	return deleteAdvertiser;
};

export const viewActivities = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}
	const advertiser = await Advertiser.findById(id);
	if (!advertiser) {
		throw new HttpError(404, "Advertiser not Found");
	}
	if (!advertiser.isVerified) {
		throw new HttpError(401, "Advertiser is Not Verified");
	}
	const activities = await advertiser.populate("activities");

	return activities.activities;
};


/*"an account will be deleted only
 if no events or activities or itenararies are upcoming 
 and have bookings that are paid for.
 The account profiles along with all associated events, activities and itineraries will not be visible to tourists."
 */
export const softDeleteAdvertiser = async (id: string) => {
	const advertiser = await getAdvertiserById(id);

	if (!advertiser) {
		throw new HttpError(404, "Advertiser not Found");
	}

	for (const id of advertiser.activities) {
		await activityService.softDeleteActivity(id.toString());
	}

	await advertiser.updateOne({ isDeleted: true });

	return advertiser;
};
