import { NextFunction, Request, Response } from "express";
import { PipelineStage, Types } from "mongoose";

import { complaint } from "../../Models/Interactions/complaint.model";
import { filterByComplaintStatus } from "../../Services/Operations/Filter/filterBuilder.service";

//Creates a Complaint --Tourist Only
export const createComplaint = async (req: Request, res: Response) => {
	try {
		const { userid } = req.headers;
		// TODO :: title, body are required fields, check if they are present
		// TODO :: userid is required, check if it is present
		// TODO :: update the array of complaints in the tourist model
		const newComplaint = await complaint.create({
			...req.body,
			createdBy: userid,
		});
		res.status(201).json(newComplaint);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

//Retrieve all Complaints --Used by Admin --list
export const getAllComplaints = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const pipeline: PipelineStage[] = [
			{
				$lookup: {
					from: "tourists",
					localField: "createdBy",
					foreignField: "_id",
					as: "createdBy",
				},
			},
			{
				$unwind: {
					path: "$createdBy",
					preserveNullAndEmptyArrays: true,
				},
			},
		];
		pipeline.push(...filterByComplaintStatus(req.query));
		const complaints = await complaint.aggregate(pipeline);
		res.status(200).json(complaints);
	} catch (error) {
		next(error);
	}
};

//Reterive all Complaints by Tourist --Used by Tourist --list
export const getAllComplaintsByTourist = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userid } = req.headers;
		const complaints = await complaint.find({ createdBy: userid });
		res.status(200).json(complaints);
	} catch (error) {
		next(error);
	}
};

//Retrieve a Complaint by ID --Used by Admin --form
export const getComplaintById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const complaintData = await complaint
			.findById(id)
			.populate("createdBy")
			.exec();
		if (!complaintData) {
			return res.status(404).json({ message: "Complaint not found" });
		}
		res.status(200).json(complaintData);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const updateComplaintByAdmin = async (req: Request, res: Response) => {
	try {
		const { userid } = req.headers;
		const { id } = req.params;
		const { status, reply } = req.body;
		// Log incoming data

		const updatedComplaint = await complaint.findByIdAndUpdate(
			id,
			{ status, reply, replyedBy: userid },
			{ new: true },
		);

		if (!updatedComplaint) {
			return res.status(404).json({ message: "Complaint not found" });
		}
		console.log(updatedComplaint);
		res.status(200).json(updatedComplaint);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

//Update a Complaint --Used by Tourist --Tourist Reply Changed
export const updateComplaintByTourist = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { reply } = req.body;
		const updatedComplaint = await complaint.findByIdAndUpdate(
			id,
			{ reply },
			{ new: true },
		);
		if (!updatedComplaint) {
			return res.status(404).json({ message: "Complaint not found" });
		}
		res.status(200).json(updatedComplaint);
	} catch (error) {
		next(error);
	}
};

//Delete a Complaint --Used by Admin --Delete
export const deleteComplaint = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const complaintData = await complaint.findByIdAndDelete(id);
		if (!complaintData) {
			return res.status(404).json({ message: "Complaint not found" });
		}
		res.status(200).json({ message: "Complaint deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};
