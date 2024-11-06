import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Advertiser, IAdvertiser } from "../../Models/Users/advertiser.model";
import { hashPassword } from "../Auth/password.service";
import uniqueUsername from "../Auth/username.service";
import * as adminService from "./admin.service";
import { Transportation } from "@/Models/Travel/transportation.model";

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


export const addTransportation = async (advertiserId: string, transportationId: string) => {
	if (!Types.ObjectId.isValid(advertiserId)) {
	  throw new HttpError(400, "Advertiser id is not valid");
	}
  
	const advertiser = await Advertiser.findById(advertiserId);
	if (!advertiser) {
	  throw new HttpError(404, "Advertiser not found");
	}

	const transportation = await Transportation.findById(transportationId);

	if (!transportation) {
		throw new HttpError(404, "Transportation not found");
	}

	advertiser.transportations.push(transportation.id);
	await advertiser.save();
	return advertiser;
};

export const removeTransportation = async (advertiserId: string, transportationId: string) => {
  if (!Types.ObjectId.isValid(advertiserId)) {
    throw new HttpError(400, "Advertiser id is not valid");
  }

  const advertiser = await Advertiser.findById(advertiserId);
  if (!advertiser) {
    throw new HttpError(404, "Advertiser not found");
  }
  const transportation = await Transportation.findById(transportationId);

  if (!transportation) {
	  throw new HttpError(404, "Transportation not found");
  }
  if (!advertiser.transportations.includes(transportation.id)) {
    throw new HttpError(404, "Transportation not found in the advertiser's list");
  }

  const removed = await advertiser.updateOne({
    $pull: { transportations: transportationId }
  });

  if (removed.modifiedCount === 0) {
    throw new HttpError(404, "Failed to remove transportation");
  }

  await advertiser.save();

  return advertiser;
};
