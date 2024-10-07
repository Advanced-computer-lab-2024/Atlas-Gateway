import { Request, Response } from "express";
import { Types } from "mongoose";

import { Admin } from "../../Database/Models/Users/admin.model";
import { Advertiser } from "../../Database/Models/Users/advertiser.model";

export const createAdvertiser = async (req: Request, res: Response) => {
	try {
		// companyProfile;
		const {
			name,
			username,
			email,
			password,
			hotline,
			website,
			description,
		} = req.body;
		if (!username || !email || !password) {
			res.status(400).send("username, email and password are required");
		}

		// if (!companyProfile) {
		// 	res.status(400).send("companyProfile is required");
		// }

		const user = new Advertiser({
			username,
			email,
			password,
			// companyProfile,
		});
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(500).send(error);
	}
};

// export const getAdvertiserById = async (req: Request, res: Response) => {
// 	const id = req.params.id;
// 	if (!id) {
// 		res.status(400).send("id is required");
// 	}

// 	if (!Types.ObjectId.isValid(id)) {
// 		return res.status(400).send("id is invalid");
// 	}

// 	try {
// 		//maybe we need to add checker here based on the flow of the page
// 		const advertiser = await Advertiser.findById(id);
// 		if (!advertiser) {
// 			return res.status(404).send("advertiser not found");
// 		}
// 		res.status(200).send(advertiser);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).send("Failed to get advertiser");
// 	}
// };

export const getAdvertiser = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const advertiser = await Advertiser.findById(id);
		res.status(200).send(advertiser);
	} catch (error) {
		console.log(error);
		res.status(500).send("Failed to get Advertiser");
	}
};

export const getAdvertisers = async (req: Request, res: Response) => {
	try {
		const result = await Advertiser.find();
		res.status(200).send(result);
	} catch (error) {
		console.log(error);
		res.status(500).send("Failed to get advertisers");
	}
};
export const updateAdvertiser = async (req: Request, res: Response) => {
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
			const advertiser = await Advertiser.findById(id);
			if (advertiser?.isVerified) {
				const tourGuide = await Advertiser.findByIdAndUpdate(
					id,
					req.body,
					{
						new: true,
					},
				);
				res.status(200).send(tourGuide);
			} else {
				res.status(401).send("User is not Verified");
			}
		} else {
			const advertiser = await Advertiser.findByIdAndUpdate(
				id,
				req.body,
				{
					new: true,
				},
			);
			res.status(200).send(advertiser);
		}
	} catch (error) {
		res.status(500).send("Failed to update tourGuide");
	}
};
export const deleteAdvertiser = async (req: Request, res: Response) => {
	const id = req.params.id;

	if (!id) {
		res.status(400).send("id is required");
	}
	try {
		const deletedAdvertiser = await Advertiser.findByIdAndDelete(id);

		if (!deletedAdvertiser) {
			return res.status(404).send("advertiser not found");
		}
		res.status(200).send("advertiser deleted successfully");
	} catch (error) {
		res.status(500).send("Failed to delete advertiser");
	}
};

export const viewActivities = async (req: Request, res: Response) => {
	const id = req.params.id;
	const advertiser = await Advertiser.findById(id);
	const Verified = advertiser?.isVerified;
	try {
		if (Verified) {
			res.status(200).send(await Advertiser.findById(id));
		} else {
			res.status(500).send("user not Verified");
		}
		const advertiser = await Advertiser.findById(id)
			.populate("activities")
			.select("activities");
		if (!advertiser) {
			return res.status(404).send("advertiser not found");
		}

		res.status(200).send(advertiser);
	} catch (error) {
		console.log(error);
		res.status(500).send("Failed to get advertiser activities");
	}
};
