import {Tag } from "../Database/Models/tag.model";
import { Request, Response } from "express";

//Creates a historical location tag --Tourism Governer Only
export const createHistTag = async (req: Request, res: Response) => {
    try{
        const { name, type} = req.body;

        if(!name || !type)
            return res.status(400).json({message: "Misisng tag type or value"});

        const tag = new Tag({
            name,
            type
        })

        await tag.save()

        res.status(200).send(tag);
    }catch(error){
        res.status(500).json({message: "Internal Server Error"})
        console.log(error);
    }
}

//Retieve all historical location tags --Used in many things
export const getHistTags = async (req: Request, res: Response) => {
    try{
        const dataset = await Tag.find( {type: { $ne: "Preference"}} );
        res.status(200).send(dataset)
    }catch(error){
        res.status(500).json({message: "Internal Server Error"});
        console.log(error);
    }
}

//Creates a preferance tag --Admin only
export const createPrefTag = async (req: Request, res: Response) => {
    try{
    const { name } = req.body;
    if(!name){
        return res.status(400).json({message: "Tag name missing"})
    }
    const type = "Preference"
    const tag = new Tag({
        name,
        type
    })

    await tag.save()

        res.status(200).send(tag);
    }catch(error){
        res.status(500).json({message: "Internal Server Error"});
        console.log(error);
    }
}

//Retieve all preference tags --Used in many things
export const getPrefTags = async (req: Request, res: Response) => {
    try{
        const dataset = await Tag.find( {type: "Preference"} );
        res.status(200).send(dataset)
    }catch(error){
        res.status(500).json({message: "Internal Server Error"});
        console.log(error);
    }
}

//Delete a prefernece tag along with it's references in activities/itineraries
export const deletePreTag = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;

        

        await Tag.findByIdAndDelete(id)
    }catch(error){
        res.status(500).json({messag: "Internal Server Error"})
    }
}