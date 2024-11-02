import { NextFunction, Request, Response } from "express";

import HttpError from "../../Errors/HttpError";
import * as adminService from "../../Services/Users/admin.service";

export const createAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			throw new HttpError(
				400,
				"username, email and password are required",
			);
		}

		const admin = await adminService.createAdmin(username, email, password);

		res.status(201).json(admin);
	} catch (error) {
		next(error);
	}
};

export const getAdminById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		if (!id) {
			throw new HttpError(400, "Id is Required");
		}
		const admin = await adminService.getAdminById(id);
		res.status(200).json(admin);
	} catch (error) {
		next(error);
	}
};

export const getAdmins = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const admins = await adminService.getAllAdmins();
		res.status(200).json(admins);
	} catch (error) {
		next(error);
	}
};

export const deleteAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		if (!id) {
			throw new HttpError(400, "Id is Required");
		}

		const deletedAdmin = await adminService.deleteAdmin(id);

		res.status(200).send("Deleted Successfully");
	} catch (error) {
		next(error);
	}
};
