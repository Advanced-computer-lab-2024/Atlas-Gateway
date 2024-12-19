import { NextFunction, Request, Response } from "express";

import { comparePassword } from "../../Services/Auth/password.service";
import { findUserByUsername } from "../../Services/Auth/username.service";
import { createBirthdayPromo } from "../../Services/Promo/promo.service";

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).send("Email and password are required");
		}

		const userResult = await findUserByUsername(username);

		if (!userResult || !userResult.user) {
			return res.status(404).send("User not found");
		}

		const { user, type } = userResult;

		const isMatch = await comparePassword(password, user.password);
		if (!isMatch) {
			return res.status(400).send("Invalid credentials");
		}
		const BirthdayPromo = await createBirthdayPromo(username, user.email);
		res.status(200).send({ user, type, BirthdayPromo });
	} catch (error) {
		next(error);
	}
};
