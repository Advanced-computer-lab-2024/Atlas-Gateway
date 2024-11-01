import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import { Advertiser } from "../../Models/Users/advertiser.model";
import { Governor } from "../../Models/Users/governor.model";
import { Seller } from "../../Models/Users/seller.model";
import { TourGuide } from "../../Models/Users/tourGuide.model";
import { Tourist } from "../../Models/Users/tourist.model";
import uniqueUsername from "../../Services/Auth/uniqueUsername.service";

export const register = async (req: Request, res: Response) => {
	try {
		const {
			username,
			email,
			password,
			picture,
			type,
			mobile,
			nationality,
			dob,
			occupation,
			experience,
			prevWork,
		} = req.body;

		if (!username || !email || !password) {
			res.status(400).send("username, email and password are required");
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const resultUnique = await uniqueUsername(username);
		if (!resultUnique) {
			return res.status(400).send("Username Should Be Unique");
		}
		let user;
		switch (type) {
			case "tourist":
				if (!mobile || !nationality || !dob || !occupation) {
					return res
						.status(400)
						.send(
							"mobileNumber, nationality ,occupation and dob are required",
						);
				}
				user = new Tourist({
					username,
					email,
					password: hashedPassword,
					mobile,
					nationality,
					dob,
					occupation,
				});
				break;
			case "governer":
				user = new Governor({
					username,
					email,
					password: hashedPassword,
				});
				break;
			case "tour_guide":
				user = new TourGuide({
					username,
					email,
					password: hashedPassword,
					picture,
					experience,
					prevWork,
				});
				break;
			case "seller":
				user = new Seller({
					username,
					email,
					password: hashedPassword,
				});
				break;
			case "advertiser":
				user = new Advertiser({
					username,
					email,
					password: hashedPassword,
				});
				break;
			default:
				user = new Tourist({
					username,
					email,
					password: hashedPassword,
					mobile,
					nationality,
					dob,
					occupation,
				});
				break;
		}

		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};
