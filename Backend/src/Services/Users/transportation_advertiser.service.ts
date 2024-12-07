import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import {
	ITransportation,
	Transportation,
} from "../../Models/Travel/transportation.model";
import {
	ITransportationAdvertiser,
	TransportationAdvertiser,
} from "../../Models/Users/transportation_advertiser.model";
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
			throw new HttpError(
				400,
				"Transportation Advertiser id is not valid",
			);
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

		const transportation_advertiser =
			await TransportationAdvertiser.findById(TransportationAdvertiserId);
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

export const report = async (
	id: string,
	options: { date?: string; TransportationId?: string } = {},
) => {
	const advertiser = await getTransportationAdvertiserById(id);

	if (!advertiser) {
		throw new HttpError(404, "Advertiser not Found");
	}

	await advertiser.populate("transportations");

	let transportations: ITransportation[] =
		advertiser.transportations as ITransportation[];

	// if itineraryId is provided, filter the bookings by itineraryId
	if (options.TransportationId) {
		transportations = transportations.filter(
			(transportation: ITransportation) =>
				transportation.id == options.TransportationId,
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

		transportations = transportations.filter(
			(transportation: ITransportation) => {
				const start = new Date(transportation.pickUpTime);
				console.log(start, startDate, endDate);
				return start >= startDate && start <= endDate;
			},
		);
	}

	console.log(transportations);

	let totalSales = 0;
	let totalBookings = 0;

	let sales = transportations.map((transportation: ITransportation) => {
		const sales = transportation.numberOfBookings * transportation.price;
		const adminProfit = sales * 0.1;
		totalSales += sales - adminProfit;
		totalBookings += transportation.numberOfBookings;
		return {
			TransportationId: transportation.id,
			TransportationName: transportation.name,
			numberOfBookings: transportation.numberOfBookings,
			totalSales: sales - adminProfit,
		};
	});

	return {
		data: sales,
		metaData: {
			totalSales: totalSales,
			totalBookings: totalBookings,
		},
	};
};
