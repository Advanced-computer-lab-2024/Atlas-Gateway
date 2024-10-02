import { Request, Response } from "express";

import { Admin } from "../../Database/Models/Users/admin.model";

export const createAdmin = async (req: Request, res: Response) => {
	try {
		const { userName, email, password } = req.body;
		if (!userName || !email || !password) {
			res.status(400).send("userName, email and password are required");
		}
		const admin = await Admin.create({ userName, email, password });
		res.status(201).send(admin);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error creating admin");
	}
};

export const getAdmins = async (req: Request, res: Response) => {
	try {
		const admins = await Admin.find();
		res.status(200).send(admins);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error getting admins");
	}
};

export const deleteAdmin = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await Admin.findByIdAndDelete(id);
		res.status(200).send("Deleted Succefully");
	} catch (error) {
		res.status(500).send("Error deleting Admin");
	}
};
