import { NextFunction, Request, Response } from "express";

import HttpError from "../../Errors/HttpError";
import * as passwordService from "../../Services/Auth/password.service";

export const changePassword = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const username = req.body.username;
		const newPassword = req.body.password;
		if (!username || !newPassword) {
			throw new HttpError(
				400,
				"Username and Password are required in the body",
			);
		}
		await passwordService.changePassword(username, newPassword);
		res.status(200).send("Password changed");
	} catch (err) {
		next(err);
	}
};