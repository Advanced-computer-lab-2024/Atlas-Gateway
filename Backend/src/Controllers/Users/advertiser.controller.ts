import { Request, Response } from "express";

import { Advertiser } from "../../Database/Models/Users/advertiser.model";

export const createAdvertiser = async (req: Request, res: Response) => {
	try {
		//maybe we need to add checker here based on the flow of the page
		const { userName, email, password, companyProfile, activities } =
			req.body;
		const user = new Advertiser({
			userName,
			email,
			password,
			companyProfile,
			activities,
		});
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};
export const getAdvertiser = async (req: Request, res: Response) => {
	try {
		//maybe we need to add checker here based on the flow of the page
		res.status(200).send(await Advertiser.find());
	} catch (error) {
		console.log(error);
		res.status(500).send("failed");
	}
};
export const updateAdvertiser = async (req: Request, res: Response) => {
	const id = req.params.id;
	const companyProfile = req.body;
	try {
		//maybe we need to add checker here based on the flow of the page
		const adv = await Advertiser.findByIdAndUpdate(id, companyProfile, {
			fields: {
				companyProfile: 1,
			},
			new: true,
		});
		res.status(200).send(adv);
	} catch (error) {
		res.status(500).send("failed");
	}
};
export const deleteAdvertiser = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		//maybe we need to add checker here based on the flow of the page
		await Advertiser.findByIdAndDelete(id);
		res.status(200).send("advertiser deleted successfully");
	} catch (error) {
		res.status(500).send("Failed to delete advertiser");
	}
};
