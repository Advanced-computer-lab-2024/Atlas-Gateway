import { Request, Response } from "express";
import { Types } from "mongoose";

import { TourGuide } from "../../Database/Models/Users/tourGuide.model";

export const createTourGuide = async (req: Request, res: Response) => {
	try {
		const {
			username,
			email,
			password,
			description,
			picture,
			experience,
			previous,
		} = req.body;
		const user = new TourGuide({
			username,
			email,
			password,
			description,
			picture,
			experience,
			prevWork: previous,
		});
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};
export const getTourGuide = async (req: Request, res: Response) => {
	const id = req.params.id;

	if (!id) {
		res.status(400).send("id is required");
	}

	if (!Types.ObjectId.isValid(id)) {
		return res.status(400).send("id is invalid");
	}

	try {
		const tourGuide = await TourGuide.findById(id).populate("itinerary");
		res.status(200).send(tourGuide);
	} catch (error) {
		console.log(error);
		res.status(500).send("Failed to get tourGuide");
	}
};

export const getTourGuides = async (req: Request, res: Response) => {
	try {
		const users = await TourGuide.find().populate("itinerary");
		res.status(200).json(users);
	} catch (error) {
		res.status(500).send("Failed to get tourGuides");
	}
};

export const updateTourGuide = async (req: Request, res: Response) => {
	const id = req.params.id;
	if (!id) {
		return res.status(400).send("Id is Required");
	}
	if (!Types.ObjectId.isValid(id)) {
		return res.status(400).send("Id is Invalid ");
	}
	try {
		const tourGuide = await TourGuide.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.status(200).send(tourGuide);
	} catch (error) {
		res.status(500).send("Failed to update tourGuide");
	}
};
export const deleteTourGuide = async (req: Request, res: Response) => {
	const id = req.params.id;
	if (!id) {
		res.status(400).send("id is required");
	}

	if (!Types.ObjectId.isValid(id)) {
		return res.status(400).send("id is invalid");
	}

	try {
		await TourGuide.findByIdAndDelete(id);
		res.status(200).send("tourGuide deleted successfully");
	} catch (error) {
		res.status(500).send("Failed to delete tourGuide");
	}
};

// export const fetchTourGuideItinerary = async (req: Request, res: Response) => {
// 	const id = req.params.id;

// 	if (!id) {
// 		res.status(400).send("id is required");
// 	}
// 	const tourGuide = await TourGuide.findById(id).populate("itinerary");
// 	const Verified = tourGuide?.isVerified;
// 	try {
// 		if (Verified) {
// 			res.status(200).send(tourGuide);
// 		} else {
// 			res.status(500).send("user not Verified");
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).send("Failed to get tourGuide");
// 	}
// };
