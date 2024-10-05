import { Request, Response } from "express";

import { Admin } from "../../Database/Models/Users/admin.model";

export const createAdmin = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			res.status(400).send("username, email and password are required");
		}
		const admin = await Admin.create({ username, email, password });
		res.status(201).json(admin);
	} catch (error) {
		console.log(error);
		res.status(500).send("error creating admin");
	}
};

export const getAdmins = async (req: Request, res: Response) => {
	try {
		const admins = await Admin.find();
		res.status(200).json(admins);
	} catch (error) {
		console.log(error);
		res.status(500).send("error getting admins");
	}
};

export const deleteAdmin = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const admin = await Admin.findByIdAndDelete(id);
		if (!admin) {
			return res.status(404).send("admin not found");
		}
		res.status(200).send("deleted successfully");
	} catch (error) {
		res.status(500).send("error deleting Admin");
	}
};
