import { ITourGuide, TourGuide } from "@/Models/Users/tourGuide.model";
import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { hashPassword } from "../Auth/passwordHash.service";
import uniqueUsername from "../Auth/uniqueUsername.service";
import * as adminService from "./admin.service";

export const createTourGuide = async (
	username: string,
	email: string,
	password: string,
) => {
	const resultUnique = await uniqueUsername(username);
	if (!resultUnique) {
		throw new HttpError(400, "Username Should Be Unique");
	}
	const hashedPassword = await hashPassword(password);

	const tourGuide = await TourGuide.create({
		username,
		email,
		hashedPassword,
	});

	return tourGuide;
};

export const getTourGuideById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const tourGuide = await TourGuide.findById(id).populate("itinerary");

	return tourGuide;
};

export const getTourGuides = async () => {
	const tourGuides = await TourGuide.find().populate("itinerary");
	return tourGuides;
};

export const updateTourGuide = async (
	id: string,
	userid: string,
	newGuide: ITourGuide,
) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Id is Invalid ");
	}
	if (!Types.ObjectId.isValid(userid)) {
		throw new HttpError(400, "Logged in User id is invalid");
	}

	const admin = await adminService.getAdminById(userid);
	if (!admin) {
		const tourGuide = await TourGuide.findById(id);
		if (!tourGuide?.isVerified) {
			throw new HttpError(401, "Tour Guide is Not verified");
		}
	}
	const tourGuide = await TourGuide.findByIdAndUpdate(id, newGuide, {
		new: true,
	});
	return tourGuide;
};

export const deleteTourGuide = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const tourGuide = await TourGuide.findByIdAndDelete(id);
	return tourGuide;
};
