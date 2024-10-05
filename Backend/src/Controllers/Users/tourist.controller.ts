import { Request, Response } from "express";

import { Tourist } from "../../Database/Models/Users/tourist.model";

export const createTourist = async (req: Request, res: Response) => {
	try {
		const {
			userName,
			email,
			password,
			profile,
			mobileNumber,
			nationality,
			dob,
			job,
		} = req.body;
		const user = new Tourist({
			userName,
			email,
			password,
			profile,
			mobileNumber,
			nationality,
			dob,
			job,
		});
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};

export const getTourist = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const tourist = await Tourist.findById(id);
		res.status(200).send(tourist);
	} catch (error) {
		console.log(error);
		res.status(500).send("failed");
	}
}

export const getTourists = async (req: Request, res: Response) => {
	try {
		const users = await Tourist.find();
		res.status(201).json(users);
	} catch (error) {
		res.status(400).json(error);
	}
};

export const updateTourist = async (req: Request, res: Response) => {
	const id = req.params.id;
	const {
		userName,
		email,
		password,
		wallet,
		mobileNumber,
		nationality,
		dob,
		job,
		address,
		currency,
		profile,
	} = req.body;
	try {
		const touristData = await Tourist.findByIdAndUpdate(
			id,
			{
				userName,
				email,
				password,
				wallet,
				mobileNumber,
				nationality,
				dob,
				job,
				address,
				currency,
				profile,
			},
			{
				new: true,
			},
		);
		res.status(200).send(touristData);
	} catch (error) {
		res.status(500).send("failed");
	}
};
export const deleteTourist = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		//maybe we need to add checker here based on the flow of the page
		await Tourist.findByIdAndDelete(id);
		res.status(200).send("Tourist deleted successfully");
	} catch (error) {
		res.status(500).send("Failed to delete Tourist");
	}
};
