import { Request, Response } from "express";
import { Tourist } from "../../Database/Models/Users/tourist.model";

export const createTourist = async (req: Request, res: Response) => {
const {username,email,password,wallet,address,currency,loyaltyPoints,profile}=req.body;
try{
	const newTourist=new Tourist({username,email,password,wallet,address,currency,loyaltyPoints,profile})
	await newTourist.save()
	res.status(201).send(newTourist);
}
catch(error){
	console.log(error)
	res.status(500).send("Error in creating the new row")
}
};
export const getTourist=async(req: Request, res: Response) => {
	try{
		res.status(200).send(await Tourist.find());
	}
	catch(error){
		console.log(error)
		res.status(500).send("Error in fetching rows")
	}
};
export const getTouristInfo=async(req: Request, res: Response) => {
	const id=req.params.id
	try{
		res.status(200).send(await Tourist.findById(id).select('wallet profile'));
	}
	catch(error){
		console.log(error)
		res.status(500).send("Failed to fetch ur profile info")
	}
};
export const updateTouristInfo=async(req:Request,res:Response)=>{
	const id=req.params.id;
	const{email,password,address,currency,loyaltyPoints,profile}=req.body;
	try{
		res.status(200).send(await Tourist.findByIdAndUpdate(id,{email,password,address,currency,loyaltyPoints,profile},{new:true}))
	}
	catch(error){
		console.log(error)
		res.status(500).send("Failed to update");
	}
}