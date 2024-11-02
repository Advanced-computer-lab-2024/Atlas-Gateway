import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { ITourist, Tourist } from "../../Models/Users/tourist.model";
import { hashPassword } from "../Auth/passwordHash.service";
import uniqueUsername from "../Auth/uniqueUsername.service";

export const createTourist = async (
	username: string,
	email: string,
	password: string,
	mobile: string,
	nationality: string,
	dob: Date,
	occupation: string,
) => {
	const resultUnique = await uniqueUsername(username);
	if (!resultUnique) {
		throw new HttpError(400, "Username Should Be Unique");
	}
	const hashedPassword = await hashPassword(password);

	const tourist = await Tourist.create({
		username: username,
		email: email,
		password: hashedPassword,
		mobile: mobile,
		nationality: nationality,
		dob: dob,
		occupation: occupation,
	});

	return tourist;
};

export const getTouristById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}
	const tourist = await Tourist.findById(id);
	return tourist;
};
export const getTourists = async () => {
	const tourists = await Tourist.find();
	return tourists;
};

export const updateTourist = async (id: string, newTourist: ITourist) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Tourist id is not valid");
	}

	const tourist = await Tourist.findByIdAndUpdate(id, newTourist, {
		new: true,
	});
	return tourist;
};

export const deleteTourist = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Id is Invalid and Required");
	}
	const tourist = await Tourist.findByIdAndDelete(id);

	return tourist;
};

export const getTouristsByUsername = async (username: string) => {};
