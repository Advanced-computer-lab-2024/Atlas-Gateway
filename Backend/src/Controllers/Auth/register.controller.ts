import { NextFunction, Request, Response } from "express";

import { downloadDocuments } from "../../Services/Auth/downloadDocuments";
import { uploadDocuments } from "../../Services/Auth/uploadDocuments";
import { createAdvertiser } from "../../Services/Users/advertiser.service";
import { createGovernor } from "../../Services/Users/governor.service";
import { createSeller } from "../../Services/Users/seller.service";
import { createTourGuide } from "../../Services/Users/tourGuide.service";
import { createTourist } from "../../Services/Users/tourist.service";

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const {
			username,
			email,
			password,
			type,
			mobile,
			nationality,
			dob,
			occupation,
		} = req.body;
		if (!username || !email || !password) {
			res.status(400).send("username, email and password are required");
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
				user = await createTourist(
					username,
					email,
					password,
					mobile,
					nationality,
					dob,
					occupation,
				);
				break;
			case "governer":
				user = await createGovernor(username, email, password);
				break;
			case "tour_guide":
				user = await createTourGuide(username, email, password);
				break;
			case "seller":
				user = await createSeller(username, email, password);
				break;
			case "advertiser":
				user = await createAdvertiser(username, email, password);
				break;
			default:
				user = await createTourist(
					username,
					email,
					password,
					mobile,
					nationality,
					dob,
					occupation,
				);
				break;
		}
		res.status(201).send(user);
	} catch (error) {
		next(error);
	}
};

export const uploadDocument = async (req: Request, res: Response) => {
	try {
		const file = req.file as Express.Multer.File | undefined;
		const { filePath } = req.body;
		if (!file) {
			return res.status(400).send("File is required");
		}
		const result = await uploadDocuments(filePath, file);
		res.status(200).send(result);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const downloadDocument = async (req: Request, res: Response) => {
	try {
		const { filePath } = req.body;
		const result = await downloadDocuments(filePath);
		res.status(200).send(result);
	} catch (error) {
		res.status(500).send(error);
	}
};
