import { Request, Response } from "express";

import { Governor } from "../../Database/Models/Users/governor.model";

export const crteatGovernor = async (req: Request, res: Response) => {
	try {
		const { username, email, password, historicalLocations } = req.body;
		if (!username || !email || !password) {
			res.status(400).send("username, email and password are required");
		}
		const governor = await Governor.create({
			username,
			email,
			password,
		});
		res.status(201).send(governor);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error creating governor");
	}
};

export const getGovernors = async (req: Request, res: Response) => {
	try {
		const governors = await Governor.find();
		res.status(200).send(governors);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error getting governors");
	}
};

export const deleteGovernor = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await Governor.findByIdAndDelete(id);
		res.status(200).send("Deleted Succefully");
	} catch (error) {
		res.status(500).send("Error deleting Governor");
	}
};
