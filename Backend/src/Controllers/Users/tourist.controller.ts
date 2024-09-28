import { Request, Response } from "express";
import { Tourist } from "src/Database/Models/Users/tourist.model";

const createUser = async (req: Request, res: Response) => {
	try {
		const { role, name, email, password, profile, status } = req.body;
		const user = new Tourist({
			role,
			name,
			email,
			passwordHash: password,
			profile,
			status,
		});
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};
