import { Request, Response } from "express";

import { Seller } from "../../Database/Models/Users/seller.model";

export const createSeller = async (req: Request, res: Response) => {
	try {
		const { username, email, password, picture, description, products,isVerified } =
			req.body;
		const user = new Seller({
			username,
			email,
			password,
			picture,
			description,
			products,
			isVerified
		});
	
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};
export const listSellers = async (req: Request, res: Response) => {
	
	try {
		res.status(200).send(await Seller.find());
	} catch (error) {
		console.log(error);
		res.status(500).send("failed");
	}
};
export const getSeller = async (req: Request, res: Response) => {
  const id=req.params.id
  const seller=await Seller.findById(id);
  const Verified=seller?.isVerified
	try {

		if(Verified){
			res.status(200).send(seller)
		}
		else{
			res.status(400).send("User not verified")
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("failed");
	}
};
export const updateSeller = async (req: Request, res: Response) => {
	const id = req.params.id;
	const { username, email, password, picture, description, products } =
		req.body;
	const seller=await Seller.findById(id);
	const Verified=seller?.isVerified
	try {
		if(Verified){
		res.status(200).send(await Seller.findByIdAndUpdate(
			id,
			{ username, email, password, picture, description, products },
			{
				new: true,
			},
		)	);}
		else{
			res.status(400).send("User not verified")
		}
	} catch (error) {
		res.status(500).send("failed");
	}
};
export const deleteSeller = async (req: Request, res: Response) => {
	const id = req.params.id;
	const seller=await Seller.findById(id);
	const Verified=seller?.isVerified
	try {
		if(Verified){
		await Seller.findByIdAndDelete(id);
		res.status(200).send("Seller deleted successfully");
		}
		else{
			res.status(400).send("User not verified")
		}
	} catch (error) {
		res.status(500).send("Failed to delete Seller");
	}
};
