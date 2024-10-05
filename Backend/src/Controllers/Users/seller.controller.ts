import { Request, Response } from "express";

import { Seller } from "../../Database/Models/Users/seller.model";

export const createSeller = async (req: Request, res: Response) => {
	try {
		const { username, email, password, picture, description, products } =
			req.body;
		const user = new Seller({
			username,
			email,
			password,
			picture,
			description,
			products,
		});
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};

export const getSeller = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const seller = await Seller.findById(id);
		res.status(200).send(seller);
	} catch (error) {
		console.log(error);
		res.status(500).send("failed");
	}
};

export const getSellers = async (req: Request, res: Response) => {
	try {
		res.status(200).send(await Seller.find());
	} catch (error) {
		console.log(error);
		res.status(500).send("failed");
	}
};
export const updateSeller = async (req: Request, res: Response) => {
	const id = req.params.id;
	const { username, email, password, picture, description, products } =
		req.body;
	try {
		//maybe we need to add checker here based on the flow of the page
		const adv = await Seller.findByIdAndUpdate(
			id,
			{ username, email, password, picture, description, products },
			{
				new: true,
			},
		);
		res.status(200).send(adv);
	} catch (error) {
		res.status(500).send("failed");
	}
};
export const deleteSeller = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		//maybe we need to add checker here based on the flow of the page
		await Seller.findByIdAndDelete(id);
		res.status(200).send("Seller deleted successfully");
	} catch (error) {
		res.status(500).send("Failed to delete Seller");
	}
};
