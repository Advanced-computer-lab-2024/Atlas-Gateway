import bcrypt from "bcryptjs";

import HttpError from "../../Errors/HttpError";
import { findUserByUsername } from "./username.service";

export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password1: string, password2: string) => {
	return await bcrypt.compare(password1, password2);
};

export const changePassword = async (username: string, password: string) => {
	const foundUser = await findUserByUsername(username);
	if (!foundUser) {
		throw new HttpError(404, "User not Found");
	}
	const hashedPass = await hashPassword(password);

	foundUser.user.password = hashedPass;

	await foundUser.user.validate();

	await foundUser.user.save();

	return foundUser.user;
};
