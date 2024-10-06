import { Request, Response } from "express";

import { Advertiser } from "../../Database/Models/Users/advertiser.model";

export const createAdvertiser = async (req: Request, res: Response) => {
	try {
		const { username, email, password, companyProfile, activities } =
			req.body;
		const user = new Advertiser({
			username,
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
		res.status(200).send(await Advertiser.find());
	} catch (error) {
		console.log(error);
		res.status(500).send("failed");
	}
};
export const updateAdvertiser = async (req: Request, res: Response) => {
	const id = req.params.id;
	const advertiser=await Advertiser.findById(id);
	const Verified=advertiser?.isVerified
	const { username, email, password, companyProfile, activities } = req.body;
	try {
		if(Verified){
		const adv = await Advertiser.findByIdAndUpdate(
			id,
			{ username, email, password, companyProfile, activities },
			{
				new: true,
			},
		);
		res.status(200).send(adv);
	}
	else{
		res.status(500).send("user not Verified");
	}
	} catch (error) {
		res.status(500).send("failed");
	}
};
export const deleteAdvertiser = async (req: Request, res: Response) => {
	const id = req.params.id;
	const advertiser=await Advertiser.findById(id);
	const Verified=advertiser?.isVerified
	try {
		if(Verified){
		await Advertiser.findByIdAndDelete(id);
		res.status(200).send("advertiser deleted successfully");
		}
		else{
			res.status(500).send("user not Verified");
		}
	} catch (error) {
		res.status(500).send("Failed to delete advertiser");
	}
};

export const viewActivities = async (req: Request, res: Response) => {
	const id=req.params.id
	const advertiser=await Advertiser.findById(id);
	const Verified=advertiser?.isVerified
	try {
		if(Verified){
		res.status(200).send(await Advertiser.findById(id));}
		else{
			res.status(500).send("user not Verified");
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("failed");
	}
};