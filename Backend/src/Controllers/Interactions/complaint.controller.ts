import { NextFunction, Request, Response } from "express";
import { PipelineStage, Types } from "mongoose";

import { complaint } from "../../Models/Interactions/complaint.model";
import { filterByComplaintStatus } from "../../Services/Operations/Filter/filterBuilder.service";

//Creates a Complaint --Tourist Only
export const createComplaint = async (req: Request, res: Response) => {
	try {
		const { title, body, date, state, reply, createdBy } = req.body;
		const newComplaint = await complaint.create({
			title,
			body,
			date,
			reply,
			state,
			createdBy,
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

//Update a Complaint --Used by Admin --Admin Reply and change state from pending to resolved
export const updateComplaintByAdmin = async (req: Request, res: Response) => {
	try {
		const { replyedBy } = req.headers;
		const { id } = req.params;
		const { state, reply } = req.body;

		const updatedComplaint = await complaint.findByIdAndUpdate(
			id,
			{ state, reply, replyedBy },
			{ new: true },
		);

		if (!updatedComplaint) {
			return res.status(404).json({ message: "Complaint not found" });
		}

		res.status(200).json(updatedComplaint);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

//Update a Complaint --Used by Tourist --Tourist Reply Changed
export const updateComplaintByTourist = async (req: Request, res: Response) => {
	try {
		const { id, createdBy } = req.params;
		const { body, date, state } = req.body;

		if (state === "resolved") {
			return res
				.status(400)
				.json({ message: "Complaint already resolved" });
		} else {
			const updatedComplaint = await complaint.findByIdAndUpdate(
				id,
				{ body, date },
				{ new: true },
			);

			if (!updatedComplaint) {
				return res.status(404).json({ message: "Complaint not found" });
			}

			res.status(200).json(updatedComplaint);
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
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
