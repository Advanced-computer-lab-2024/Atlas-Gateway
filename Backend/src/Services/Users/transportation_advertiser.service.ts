import { Types } from "mongoose";



import HttpError from "../../Errors/HttpError";
import { Transportation } from "../../Models/Travel/transportation.model";
import { ITransportationAdvertiser, TransportationAdvertiser } from "../../Models/Users/transportation_advertiser.model";
import { hashPassword } from "../Auth/password.service";
import uniqueUsername from "../Auth/username.service";
import * as adminService from "./admin.service";


export const createTransportationAdvertiser = async (
	username: string,
	email: string,
	password: string,
) => {
	const resultUnique = await uniqueUsername(username);
	if (!resultUnique) {
		throw new HttpError(400, "Username should be unique");
	}
	const hashedPassword = await hashPassword(password);
	const adv = await TransportationAdvertiser.create({
		username: username,
		email: email,
		password: hashedPassword,
	});
	return adv;
};

export const getTransportationAdvertisers = async () => {
	return await TransportationAdvertiser.find();
};

export const getTransportationAdvertiserById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}
	const adv = await TransportationAdvertiser.findById(id);

	return adv;
};

export const updateTransportationAdvertiser = async (
	id: string,
	userId: string,
	newTransportationAdvertiser: Partial<ITransportationAdvertiser>,
) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}
	if (!Types.ObjectId.isValid(userId)) {
		throw new HttpError(400, "User id is invalid");
	}
	const admin = await adminService.getAdminById(userId);
	if (!admin) {
		const transportation_advertiser =
			await getTransportationAdvertiserById(id);
		const overRide = true
			? Object.keys(newTransportationAdvertiser)[0] == "idPath" ||
				Object.keys(newTransportationAdvertiser)[0] == "taxCardPath" ||
				Object.keys(newTransportationAdvertiser)[0] == "imagePath"
			: false;
		if (
			!transportation_advertiser ||
			(!transportation_advertiser.isVerified && !overRide)
		) {
			throw new HttpError(401, "User is not Verified");
		}
	}
	const transportation_advertiser =
		await TransportationAdvertiser.findByIdAndUpdate(
			id,
			newTransportationAdvertiser,
			{
				new: true,
			},
		);
	return transportation_advertiser;
};

export const deleteTransportationAdvertiser = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const deleteTransportationAdvertiser =
		await TransportationAdvertiser.findByIdAndDelete(id);

	if (!deleteTransportationAdvertiser) {
		throw new HttpError(404, "transportation_advertiser not found");
	}
	return deleteTransportationAdvertiser;
};

export const addTransportation = async (
	TransportationAdvertiserId: string,
	transportationId: string,
) => {
	try {
		if (!Types.ObjectId.isValid(TransportationAdvertiserId)) {
			throw new HttpError(400, "Transportation Advertiser id is not valid");
		}

		const transportation_advertiser =
			await TransportationAdvertiser.findById(TransportationAdvertiserId);
		if (!transportation_advertiser) {
			throw new HttpError(404, "Transportation Advertiser not found");
		}

		const transportation = await Transportation.findById(transportationId);
		if (!transportation) {
			throw new HttpError(404, "Transportation not found");
		}

		transportation_advertiser.transportations.push(transportation.id);
		await transportation_advertiser.save();

		return transportation_advertiser;
	} catch (error) {
		if (error instanceof HttpError) {
			throw error;
		} else {
			console.error("Unexpected error in addTransportation:", error);
			throw new HttpError(
				500,
				"An unexpected error occurred while adding transportation",
			);
		}
	}
};

export const removeTransportation = async (
	TransportationAdvertiserId: string,
	transportationId: string,
) => {
	try {
		if (!Types.ObjectId.isValid(TransportationAdvertiserId)) {
			throw new HttpError(
				400,
				"Transportation Advertiser id is not valid",
			);
		}

		const transportation_advertiser = await TransportationAdvertiser.findById(TransportationAdvertiserId);
		if (!transportation_advertiser) {
			throw new HttpError(404, "Transportation Advertiser not found");
		}

		const transportation = await Transportation.findById(transportationId);
		if (!transportation) {
			throw new HttpError(404, "Transportation not found");
		}

		if (
			!transportation_advertiser.transportations.includes(
				transportation.id,
			)
		) {
			throw new HttpError(
				404,
				"Transportation not found in the advertiser's list",
			);
		}

		const removed = await transportation_advertiser.updateOne({
			$pull: { transportations: transportationId },
		});

		if (removed.modifiedCount === 0) {
			throw new HttpError(404, "Failed to remove transportation");
		}

		await transportation_advertiser.save();

		return transportation_advertiser;
	} catch (error) {
		if (error instanceof HttpError) {
			throw error;
		} else {
			console.error("Unexpected error in removeTransportation:", error);
			throw new HttpError(
				500,
				"An unexpected error occurred while removing transportation",
			);
		}
	}
};