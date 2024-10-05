import { Request, Response } from "express";

import { Governor } from "../../Database/Models/Users/governor.model";
import { Places } from "../../Database/Models/places.model";

export const crteatGovernor = async (req: Request, res: Response) => {
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
		const historicalLocations = await Places.find({ governorId: id });
		res.status(200).json(historicalLocations);
	} catch (error) {
		console.log(error);
		res.status(500).send("error deleting Governor");
	}
};

export const deleteGovernor = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const governor = await Governor.findByIdAndDelete(id);
		if (!governor) {
			return res.status(404).send("governor not found");
		}
		res.status(200).send("deleted successfully");
	} catch (error) {
		res.status(500).send("error deleting Governor");
	}
};
