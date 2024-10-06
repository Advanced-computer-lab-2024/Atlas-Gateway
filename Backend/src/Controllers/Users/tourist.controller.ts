import { Request, Response } from "express";
import { Types } from "mongoose";

import { Tourist } from "../../Database/Models/Users/tourist.model";
import { Console } from "console";

export const createTourist = async (req: Request, res: Response) => {
	try {
		const {
			name,
			userName,
			email,
			password,
			profile,
			mobile,
			nationality,
			dob,
			job,
		} = req.body;
		const user = new Tourist({
			name,
			userName,
			email,
			password,
			profile,
			mobile,
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

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).send("id is invalid");
		}

		const tourist = await Tourist.findById(id);
		res.status(200).send(tourist);
	} catch (error) {
		console.log(error);
		res.status(500).send("failed");
	}
};

export const getTourists = async (req: Request, res: Response) => {
	try {
		const users = await Tourist.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(400).json(error);
	}
};

export const updateTourist = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const touristData = await Tourist.findByIdAndUpdate(
			id,
			req.body,
			{
				new: true,
			},
		);
		res.status(200).send(touristData);
	} catch (error) {
		console.log(error);
		res.status(500).send("Failed to update Tourist");
	}
};
export const deleteTourist = async (req: Request, res: Response) => {
	const id = req.params.id;

	if (!Types.ObjectId.isValid(id)) {
		return res.status(400).send("Id is Invalid and Required");
	}

	try {
		//maybe we need to add checker here based on the flow of the page
		await Tourist.findByIdAndDelete(id);
		res.status(200).send("Tourist deleted successfully");
	} catch (error) {
		res.status(500).send("Failed to delete Tourist");
	}
};
