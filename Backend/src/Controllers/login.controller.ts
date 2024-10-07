import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import { Admin } from "../Database/Models/Users/admin.model";
import { Advertiser } from "../Database/Models/Users/advertiser.model";
import { Governor } from "../Database/Models/Users/governor.model";
import { Seller } from "../Database/Models/Users/seller.model";
import { TourGuide } from "../Database/Models/Users/tourGuide.model";
import { Tourist } from "../Database/Models/Users/tourist.model";

const findUserByUsername = async (username: string) => {
	let user = await Tourist.findOne({ username });
	if (user) return { user, type: "tourist" };

	user = await Governor.findOne({ username });
	if (user) return { user, type: "governor" };

	user = await TourGuide.findOne({ username });
	if (user) return { user, type: "tour_guide" };

	user = await Seller.findOne({ username });
	if (user) return { user, type: "seller" };

	user = await Advertiser.findOne({ username });
	if (user) return { user, type: "advertiser" };

	user = await Admin.findOne({ username });
	if (user) return { user, type: "admin" };

	return null;
};

export const login = async (req: Request, res: Response) => {
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

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).send("Invalid credentials");
		}

		res.status(200).send({ user, type });
	} catch (error) {
		res.status(500).send("Server error");
	}
};
