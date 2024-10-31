import { Request, Response } from "express";
import { Types } from "mongoose";

import { Admin } from "../../Models/Users/admin.model";
import { Seller } from "../../Models/Users/seller.model";

export const createSeller = async (req: Request, res: Response) => {
	try {
		const { username, name, email, password, picture, description } =
			req.body;

		if (!username || !email || !password || !name) {
			res.status(400).send(
				"username, name ,email and password are required",
			);
		}
		const user = new Seller({
			username,
			name,
			email,
			password,
			picture,
			description,
		});
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};

export const getSeller = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const seller = await Seller.findById(id);
		res.status(200).send(seller);
	} catch (error) {
		console.log(error);
		res.status(500).send("Failed to get seller");
	}
};

export const getSellers = async (req: Request, res: Response) => {
	try {
		const result = await Seller.find();

		res.status(200).send(result);
	} catch (error) {
		console.log(error);
		res.status(500).send("Failed to get sellers");
	}
};
export const updateSeller = async (req: Request, res: Response) => {
	const id = req.params.id;
	const userid = req.headers.userid;
	if (!id) {
		return res.status(400).send("Id is Required");
	}
	if (!Types.ObjectId.isValid(id)) {
		return res.status(400).send("Id is Invalid ");
	}
	try {
		const admin = await Admin.findById(userid);
		if (!admin) {
			const seller = await Seller.findById(id);
			if (seller?.isVerified) {
				const tourGuide = await Seller.findByIdAndUpdate(id, req.body, {
					new: true,
				});
				res.status(200).send(tourGuide);
			} else {
				res.status(401).send("admin is not Verified");
			}
		} else {
			const seller = await Seller.findByIdAndUpdate(id, req.body, {
				new: true,
			});
			res.status(200).send(seller);
		}
	} catch (error) {
		res.status(500).send("Failed to update tourGuide");
	}
};
export const deleteSeller = async (req: Request, res: Response) => {
	const id = req.params.id;
	if (!id) {
		return res.status(400).send("Id is Required");
	}

	if (!Types.ObjectId.isValid(id)) {
		return res.status(400).send("Id is Invalid");
	}

	try {
		//maybe we need to add checker here based on the flow of the page
		await Seller.findByIdAndDelete(id);
		res.status(200).send("Seller deleted successfully");
	} catch (error) {
		res.status(500).send("Failed to delete Seller");
	}
};
