import { NextFunction, Request, Response } from "express";
import mongoose, { PipelineStage, Types } from "mongoose";

import { Transportation } from "../../Models/Travel/transportation.model";
import { Tourist } from "../../Models/Users/tourist.model";
import AggregateBuilder from "../../Services/Operations/aggregation.service";
import * as transportationService from "../../Services/Travel/transportation.service";
import {
	addBookedTransportation,
	cancelTransportation,
	getTouristById,
} from "../../Services/Users/tourist.service";

//Create a new product entry
export const createTransportation = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const transportation_advertiserId = req.headers.userid;

		if (!transportation_advertiserId) {
			return res
				.status(400)
				.json({ message: "Transportation Advertiser ID is required" });
		}

		const transportationData = req.body;

		const transportationCreated= await transportationService.createTransportation(transportationData, transportation_advertiserId);

		if(!transportationCreated){
			return res
				.status(400)
				.json({ message: "Error creating Transportation" });
		}

		await transportationCreated.save();
		return res.status(200).send(transportationCreated);
	} catch (error) {
		next(error);
	}
};

export const getTransportation = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;

		if (!id) {
			res.status(400).json({ error: "Transportation ID is required" });
		}

		const transportation = await transportationService.getTransportationById(id);

		if (!transportation) {
			res.status(404).send("Transportation not found");
		}

		res.status(200).send(transportation);
	} catch (error) {
		res.status(500).send("Error getting Transportation by id");
	}
};

export const getTransportationByUserId = async (
	req: Request,
	res: Response,
) => {
	const userId = req.params.userId;
	try {
		if (!Types.ObjectId.isValid(userId)) {
			return res
				.status(400)
				.json({ message: "Invalid Transportation Advertiser ID" });
		}

		const transportation = await Transportation.find({ createdBy: userId })
			.populate("createdBy")
			.populate("transportation_advertisers.transportation_advertiser");

		return res.status(200).json(transportation);
	} catch (error) {
		res.status(500).send("Error getting Transportation by id");
	}
};

export const getTransportations = async (req: Request, res: Response) => {
	try {
		const transportation = await Transportation.find()
			.populate("createdBy")
			.populate("transportation_advertisers.transportation_advertiser");
		res.status(200).send(transportation);
	} catch (error) {
		res.status(500).send("Error getting Transportation");
	}
};

export const updateTransportationById = async (req: Request, res: Response) => {
	try {
		const transportationId = req.params.id;

		if (!Types.ObjectId.isValid(transportationId)) {
			return res
				.status(400)
				.json({ message: "Invalid Transportation ID" });
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
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const deleteTransportation = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!Types.ObjectId.isValid(id)) {
			return res
				.status(400)
				.json({ message: "Invalid Transportation ID" });
		}

		const transportation = await Transportation.findById(id);
		if (!transportation) {
			return res
				.status(404)
				.json({ message: "Transportation not found" });
		}

		if (transportation?.numberOfBookings > 0) {
			return res
				.status(404)
				.json({ message: "Transportation is already booked" });
		}
		await Transportation.findByIdAndDelete(id);
		res.status(200).send("Transportation deleted Successfully");
	} catch (error) {
		res.status(500).send("Error deleting Transportation");
	}
};

export const bookTransportationById = async (req: Request, res: Response) => {
	try {
		const transportationId = req.params.id;
		const touristId = req.headers.userid;

		if (!touristId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		if (!transportationId) {
			return res
				.status(400)
				.json({ message: "Transportation ID is required" });
		}

		if (!Types.ObjectId.isValid(transportationId)) {
			return res
				.status(400)
				.json({ message: "Invalid Transportation ID" });
		}

		const transportation = await Transportation.findById(transportationId);

		if (!transportation) {
			return res
				.status(404)
				.json({ message: "Transportation not found" });
		}

		const tourist = await getTouristById(touristId.toString());

		if (!tourist) {
			return res.status(404).json({ message: "Tourist not found" });
		}

		const bookingResult = await transportationService.bookTransportation(
			transportation.id,
			tourist.id,
		);

		const addBookingResult = await addBookedTransportation(
			tourist.id,
			transportation.id,
		);

		if (!(bookingResult || addBookingResult)) {
			return res
				.status(400)
				.json({ message: "Cannot book Transportation" });
		}

		return res
			.status(201)
			.json({ message: "Transportation booked successfully" });
	} catch (error) {
		return res.status(500).json({ error: "Error booking Transportation" });
	}
};

export const cancelBookingTransportationById = async (
	req: Request,
	res: Response,
) => {
	try {
		const transportationId = req.params.id;
		const touristId = req.headers.userid;

		if (!touristId) {
			return res.status(400).json({ error: "User ID is required" });
		}

		if (!transportationId) {
			return res
				.status(400)
				.json({ error: "Transportation ID is required" });
		}

		if (!Types.ObjectId.isValid(transportationId)) {
			res.status(400).json({ error: "Invalid Transportation ID" });
		}

		const transportation = await Transportation.findById(transportationId);

		if (!transportation) {
			return res.status(404).json({ error: "Transportation not found" });
		}

		const tourist = await getTouristById(touristId.toString());

		if (!tourist) {
			return res.status(404).json({ error: "Tourist not found" });
		}

		const cancelBookingResult = await transportationService.cancelBookingTransportation(
			transportation.id,
			tourist.id,
		);

		if (!cancelBookingResult) {
			return res
				.status(400)
				.json({ error: "Cannot cancel booking Transportation" });
		}

		return res
			.status(201)
			.json({ message: "Transportation booking canceled successfully" });
	} catch (error) {
		return res
			.status(500)
			.json({ error: "Error cancelling Transportation booking" });
	}
};
