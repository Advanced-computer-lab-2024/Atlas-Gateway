import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Places } from "../../Models/Travel/places.model";
import { Governor } from "../../Models/Users/governor.model";
import { hashPassword } from "../Auth/passwordHash.service";
import uniqueUsername from "../Auth/uniqueUsername.service";

export const createGovernor = async (
	username: string,
	email: string,
	password: string,
) => {
	const resultUnique = await uniqueUsername(username);
	if (!resultUnique) {
		throw new HttpError(400, "Username Should Be Unique");
	}
	const hashedPassword = await hashPassword(password);
	const governor = await Governor.create({
		username,
		email,
		password: hashedPassword,
	});

	return governor;
};

export const getGovernors = async () => {
	return await Governor.find();
};

export const getGovernorById = async (id: string) => {};

export const updateGovernor = async (id: string) => {};

export const deleteGovernor = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Id is Invalid");
	}

	const governor = await Governor.findByIdAndDelete(id);

	if (!governor) {
		throw new HttpError(404, "governor not found");
	}
};

export const viewHistoricalLocations = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}
	const historicalLocations = await Places.find({ governorId: id });

	return historicalLocations;
};