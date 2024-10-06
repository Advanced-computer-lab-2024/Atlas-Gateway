import { Request, Response } from "express";
import { Types } from "mongoose";

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
		res.status(500).send("Error While Creating Admin");
	}
};

export const getAdminById = async (req: Request, res: Response) => {
	const id = req.params.id;
	if (!id) {
		res.status(400).send("id is required");
	}

	if (!Types.ObjectId.isValid(id)) {
		return res.status(400).send("id is invalid");
	}

	try {
		const admin = await Admin.findById(id);
		if (!admin) {
			return res.status(404).send("admin not found");
		}
		res.status(200).json(admin);
	} catch (error) {
		console.log(error);
		res.status(500).send("Failed to get admin");
	}
};

export const getAdmins = async (req: Request, res: Response) => {
	try {
		const admins = await Admin.find();
		res.status(200).json(admins);
	} catch (error) {
		console.log(error);
		res.status(500).send("Failed to get admins");
	}
};

export const deleteAdmin = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).send("Id is Required");
		}
		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).send("Id is Invalid");
		}

		const admin = await Admin.findByIdAndDelete(id);

		if (!admin) {
			return res.status(404).send("Admin Not Found");
		}
		res.status(200).send("Deleted Successfully");
	} catch (error) {
		res.status(500).send("Error While Deleting Admin");
	}
};
