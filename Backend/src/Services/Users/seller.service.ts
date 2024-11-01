import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { ISeller, Seller } from "../../Models/Users/seller.model";
import { hashPassword } from "../Auth/passwordHash.service";
import uniqueUsername from "../Auth/uniqueUsername.service";
import * as adminService from "./admin.service";

export const createSeller = async (
	username: string,
	name: string,
	email: string,
	password: string,
	picture: string,
	description: string,
) => {
	const resultUnique = await uniqueUsername(username);
	if (!resultUnique) {
		throw new HttpError(400, "Username Should Be Unique");
	}
	const hashedPassword = await hashPassword(password);
	const user = await Seller.create({
		username,
		name,
		email,
		hashedPassword,
		picture,
		description,
	});

	return user;
};

export const getSellerById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const seller = await Seller.findById(id);

	if (!seller) {
		throw new HttpError(404, "Seller not Found");
	}
	return seller;
};

export const getSellers = async () => {
	return Seller.find();
};

export const updateSeller = async (
	id: string,
	userid: string,
	newSeller: ISeller,
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
		if (!seller?.isVerified) {
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
