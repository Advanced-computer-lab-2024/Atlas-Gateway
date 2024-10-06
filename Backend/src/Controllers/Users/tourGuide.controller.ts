import { Request, Response } from "express";

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
			previous,
		});
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};
export const getTourGuide = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const tourGuide = await TourGuide.findById(id);
		res.status(200).send(tourGuide);
	} catch (error) {
		console.log(error);
		res.status(500).send("failed");
	}
};

export const getTourGuides = async (req: Request, res: Response) => {
	try {
		const users = await TourGuide.find();
		res.status(201).json(users);
	} catch (error) {
		res.status(400).json(error);
	}
};

export const updateTourGuide = async (req: Request, res: Response) => {
	const id = req.params.id;
	const tourGuide = await TourGuide.findById(id);
	const Verified = tourGuide?.isVerified;
	const {
		username,
		email,
		password,
		description,
		picture,
		experience,
		previous,
	} = req.body;
	try {
		if (Verified) {
			res.status(200).send(
				await TourGuide.findByIdAndUpdate(
					id,
					{
						username,
						email,
						password,
						description,
						picture,
						experience,
						previous,
					},
					{
						new: true,
					},
				),
			);
		} else {
			res.status(500).send("user not Verified");
		}
	} catch (error) {
		res.status(500).send("failed");
	}
};
export const deleteTourGuide = async (req: Request, res: Response) => {
	const id = req.params.id;
	const tourGuide = await TourGuide.findById(id);

	try {
		await TourGuide.findByIdAndDelete(id);
		res.status(200).send("tourGuide deleted successfully");
	} catch (error) {
		res.status(500).send("Failed to delete tourGuide");
	}
};

export const viewItinerary = async (req: Request, res: Response) => {
	const id = req.params.id;
	const tourGuide = await TourGuide.findById(id);
	const Verified = tourGuide?.isVerified;
	try {
		if (Verified) {
			res.status(200).send(await TourGuide.findById(id));
		} else {
			res.status(500).send("user not Verified");
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("failed");
	}
};
