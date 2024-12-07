import { Types } from "mongoose";

import {
	IActivityDTO,
	IActivityReportResponse,
} from "../../DTOS/Report/ActivityReportResponse";
import HttpError from "../../Errors/HttpError";
import { IActivity } from "../../Models/Travel/activity.model";
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

export const report = async (
	id: string,
	options: { date?: string; ActivityId?: string } = {},
): Promise<IActivityReportResponse> => {
	const advertiser = await getAdvertiserById(id);

	if (!advertiser) {
		throw new HttpError(404, "Advertiser not Found");
	}

	await advertiser.populate("activities");

	let activities: IActivity[] = advertiser.activities as IActivity[];

	// if itineraryId is provided, filter the bookings by itineraryId
	if (options.ActivityId) {
		activities = activities.filter(
			(activity: IActivity) => activity.id == options.ActivityId,
		);
	}

	// if date is provided, filter the bookings by date
	if (options.date) {
		const [startDateStr, endDateStr] = options.date.split(",");

		// if no date is provided, set the start date the lowest possible date and the end date to today
		let startDate =
			new Date(`${startDateStr}T00:00:00.000+00:00`) ||
			new Date("1970-01-01T00:00:00.000+00:00");
		let endDate =
			endDateStr !== "null"
				? new Date(`${endDateStr}T23:59:59.000+00:00`)
				: new Date();

		if (startDate > endDate) {
			throw new HttpError(400, "Invalid Date Range");
		}

		activities = activities.filter((activity: IActivity) => {
			const start = new Date(activity.dateTime);
			console.log(start, startDate, endDate);
			return start >= startDate && start <= endDate;
		});
	}

	console.log(activities);

	let totalSales = 0;
	let totalBookings = 0;

	let sales = activities.map((activity: IActivity) => {
		totalSales +=
			activity.numberOfBookings *
			((activity.minPrice + activity.maxPrice) / 2);

		totalBookings += activity.numberOfBookings;
		return {
			ActivityId: activity.id,
			ActivityName: activity.name,
			numberOfBookings: activity.numberOfBookings,
			totalSales:
				activity.numberOfBookings *
				((activity.minPrice + activity.maxPrice) / 2),
		} as IActivityDTO;
	});

	return {
		data: sales,
		metaData: {
			totalSales: totalSales,
			totalBookings: totalBookings,
		},
	} as IActivityReportResponse;
};
