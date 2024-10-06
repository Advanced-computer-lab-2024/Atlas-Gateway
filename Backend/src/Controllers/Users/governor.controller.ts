import { Request, Response } from "express";
import { Types } from "mongoose";

import { Governor } from "../../Database/Models/Users/governor.model";
import { Places } from "../../Database/Models/places.model";

export const createGovernor = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			res.status(400).send("username, email and password are required");
		}
		const governor = await Governor.create({ username, email, password });
		res.status(201).json(governor);
	} catch (error) {
		console.log(error);
		res.status(500).send("error creating governor");
	}
};

export const getGovernors = async (req: Request, res: Response) => {
	try {
		const governors = await Governor.find();
		res.status(200).json(governors);
	} catch (error) {
		console.log(error);
		res.status(500).send("error getting governors");
	}
};

export const getHistoricalLocations = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).send("id is required");
		}

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).send("id is invalid");
		}
		const historicalLocations = await Places.find({ governorId: id });

		res.status(200).json(historicalLocations);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error deleting Governor");
	}
};

export const deleteGovernor = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).send("Id is Required");
		}

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).send("Id is Invalid");
		}

		const governor = await Governor.findByIdAndDelete(id);

		if (!governor) {
			return res.status(404).send("governor not found");
		}

		res.status(200).send("Deleted successfully");
	} catch (error) {
		res.status(500).send("Error while deleting Governor");
	}
};
