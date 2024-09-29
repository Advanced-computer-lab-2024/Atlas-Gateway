import { Request, Response } from "express";
import { Governor } from "../../Database/Models/Users/governor.model";

export const crteatGovernor = async(req: Request, res: Response) => {
  try {
    const {userName, email, password,historicalLocations} = req.body;
    // if(!userName || !email || !password || !historicalLocations){
    //   res.status(400).send("userName, email, password and historicalLocations are required");
    // }
    const governor = await Governor.create({userName, email, password,historicalLocations});
    res.status(201).send(governor);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating governor");
  }
}

export const getGovernors = async(req: Request, res: Response) => {
  try {
    const governors = await Governor.find();
    res.status(200).send(governors);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting governors");
  }
}