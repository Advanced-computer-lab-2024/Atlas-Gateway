import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { ISeller, Seller } from "../../Models/Users/seller.model";
import { hashPassword } from "../Auth/password.service";
import uniqueUsername from "../Auth/username.service";
import * as adminService from "./admin.service";

export const createSeller = async (
	username: string,
	email: string,
	password: string,
) => {
	const resultUnique = await uniqueUsername(username);
	if (!resultUnique) {
		throw new HttpError(400, "Username Should Be Unique");
	}
	const hashedPassword = await hashPassword(password);
	const user = await Seller.create({
		username: username,
		email: email,
		password: hashedPassword,
	});

	return user;
};

export const getSellerById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const seller = await Seller.findById(id);

	return seller;
};

export const getSellers = async () => {
	return Seller.find();
};

export const updateSeller = async (
	id: string,
	userid: string,
	newSeller: Partial<ISeller>,
) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Id is Invalid ");
	}
	if (!Types.ObjectId.isValid(userid)) {
		throw new HttpError(400, "User Id is Invalid ");
	}

	const admin = await adminService.getAdminById(userid);
	if (!admin) {
		const seller = await Seller.findById(id);
		const overRide = true
			? Object.keys(newSeller)[0] == "idPath" ||
				Object.keys(newSeller)[0] == "taxCardPath" ||
				Object.keys(newSeller)[0] == "imagePath"
			: false;
		if (!seller?.isVerified && !overRide) {
			throw new HttpError(401, "Seller is not Verified");
		}
	}
	const seller = await Seller.findByIdAndUpdate(id, newSeller, {
		new: true,
	});

	return seller;
};

export const deleteSeller = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Id is Invalid");
	}
	const seller = await Seller.findByIdAndDelete(id);

	if (!seller) {
		throw new HttpError(404, "Seller not Found");
	}
	return seller;
};
