import { NextFunction, Request, Response } from "express";
import mongoose, { PipelineStage, Types } from "mongoose";

import { Transportation } from "../../Models/Travel/transportation.model";
import AggregateBuilder from "../../Services/Operations/aggregation.service";
import { Tourist } from "@/Models/Users/tourist.model";
import { addBookedTransportation } from "@/Services/Users/tourist.service";

//Create a new product entry
export const createTransportation = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const advertiserId = req.headers.userid;

        if (!advertiserId) {
            return res
                .status(400)
                .json({ message: "Advertiser ID is required" });
        }

        if (!Types.ObjectId.isValid(advertiserId.toString())) {
            return res.status(400).json({ message: "Invalid Advertiser ID" });
        }

        const transportationData = new Transportation({
            ...req.body,
            createdBy: new Types.ObjectId(advertiserId.toString()),
        });

        await transportationData.save();
        res.status(200).send(transportationData);
    } catch (error) {
        next(error);
    }
};

export const getTransportationById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Transportation ID" });
        }

        const transportation = await Transportation.findById(id)
            .populate("createdBy");

        res.status(200).send(transportation);
    } catch (error) {
        res.status(500).send("Error getting Transportation by id");
    }
};

export const getTransportationByUserId = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid Advertiser ID" });
        }

        const transportation = await Transportation.find({ createdBy: userId })
            .populate('createdBy')
            .populate('advertisers.advertiser');

        return res.status(200).json(transportation);
    } catch (error) {
        res.status(500).send("Error getting Transportation by id");
    }
};

export const getTransportation = async (req: Request, res: Response) => {
    try {
        const transportation = await Transportation.find()
            .populate('createdBy')
            .populate('advertisers.advertiser');
        res.status(200).send(transportation);
    } catch (error) {
        res.status(500).send("Error getting Transportation");
    }
};

export const updateTransportation = async (req: Request, res: Response) => {
    try {
        const transportationId = req.params.id;

        if (!Types.ObjectId.isValid(transportationId)) {
            return res.status(400).json({ message: "Invalid Transportation ID" });
        }

        const transportation = await Transportation.findByIdAndUpdate(
            transportationId,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).send(transportation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const booktransportation = async (req: Request, res: Response) => {
	try {
		const transportationId = req.params.transportationId;
		const touristId = req.headers.userId;

		if (!touristId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		if (!Types.ObjectId.isValid(transportationId)) {
			return res.status(400).json({ message: "Invalid Transportation ID" });
		}

		const transportation = await Transportation.findById(transportationId);
		if (!transportation) {
			return res.status(404).json({ message: "Transportation not found" });
		}

        if (transportation.availability > transportation.numberOfBookings) {
            const tId = touristId.toString();

            const tourist = await addBookedTransportation(tId, transportation.id);
        
            if (!tourist) {
                return res.status(500).json({ message: "Error booking Transportation" });
            }

            transportation.tourists.push(tourist.id);
        
            transportation.numberOfBookings++;

            await transportation.save();

            return res.status(201).json({ message: "Transportation booked successfully" });
        }
        return res.status(505).json({ message: "Transportation fully booked" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Error booking transportation" });
	}
};

export const deleteTransportation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Transportation ID" });
        }

        const transportation = await Transportation.findById(id);
        if (!transportation) {
            return res.status(404).json({ message: "Transportation not found" });
        }

        if (transportation?.numberOfBookings > 0) {
            return res
                .status(404)
                .json({ message: "Transportation is already booked" });
        }
        await Transportation.findByIdAndDelete(id);
        res.status(200).send("Transportation deleted Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting Transportation");
    }
};
