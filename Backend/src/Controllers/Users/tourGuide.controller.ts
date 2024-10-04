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
	try {
		//maybe we need to add checker here based on the flow of the page
		res.status(200).send(await TourGuide.find());
	} catch (error) {
		console.log(error);
		res.status(500).send("failed");
	}
};
export const updateTourGuide = async (req: Request, res: Response) => {
	const id = req.params.id;
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
		//maybe we need to add checker here based on the flow of the page
		const adv = await TourGuide.findByIdAndUpdate(
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
		);
		res.status(200).send(adv);
	} catch (error) {
		res.status(500).send("failed");
	}
};
export const deleteTourGuide = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		//maybe we need to add checker here based on the flow of the page
		await TourGuide.findByIdAndDelete(id);
		res.status(200).send("tourGuide deleted successfully");
	} catch (error) {
		res.status(500).send("Failed to delete tourGuide");
	}
};
