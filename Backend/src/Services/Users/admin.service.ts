import bcrypt from "bcryptjs";
import { Types } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Admin, IAdmin } from "../../Models/Users/admin.model";
import uniqueUsername from "../Auth/uniqueUsername.service";

export const createAdmin = async (
	username: string,
	email: string,
	password: string,
): Promise<IAdmin> => {
	const resultUnique = await uniqueUsername(username);
	if (!resultUnique) {
		throw new HttpError(400, "Username should be unique");
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const admin = await Admin.create({
		username,
		email,
		password: hashedPassword,
	});
	return admin;
};

export const getAdminById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new Error("Invalid ID");
	}
	const admin = await Admin.findById(id);
	if (!admin) {
		throw new Error("Admin not found");
	}
	return admin;
};

export const getAllAdmins = async () => {
	return await Admin.find();
};

export const deleteAdmin = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new Error("Invalid ID");
	}
	const admin = await Admin.findByIdAndDelete(id);
	if (!admin) {
		throw new Error("Admin not found");
	}
	return admin;
};
