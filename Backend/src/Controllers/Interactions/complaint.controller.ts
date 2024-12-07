import { NextFunction, Request, Response } from "express";
import { PipelineStage, Types } from "mongoose";

import { Complaint } from "../../Models/Interactions/complaint.model";
import { filterByComplaintStatus } from "../../Services/Operations/Filter/filterBuilder.service";
import buildSortCriteria from "../../Services/Operations/Sort/sortBuilder.service";

//Creates a Complaint --Tourist Only
export const createComplaint = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userid } = req.headers;
		// TODO :: title, body are required fields, check if they are present
		// TODO :: userid is required, check if it is present
		// TODO :: update the array of complaints in the tourist model
		const newComplaint = await Complaint.create({
			...req.body,
			createdBy: userid,
		});
		res.status(201).json(newComplaint);
	} catch (error) {
		next(error);
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
		pipeline.push(
			...filterByComplaintStatus(req.query),
			...buildSortCriteria(req.query),
		);
		const complaints = await Complaint.aggregate(pipeline);
		res.status(200).json(complaints);
	} catch (error) {
		next(error);
	}
};

//Reterive all Complaints by Tourist --Used by Tourist --list
export const getComplaintsByCreator = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userid } = req.headers;

		const complaints = await Complaint.find({ createdBy: userid })
			.populate("createdBy")
			.sort({ createdAt: 1 });

		res.status(200).json(complaints);
	} catch (error) {
		next(error);
	}
};

//Retrieve a Complaint by ID --Used by Admin --form
export const getComplaintById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const complaintData =
			await Complaint.findById(id).populate("createdBy");

		if (!complaintData) {
			return res.status(404).json({ message: "Complaint not found" });
		}
		res.status(200).json(complaintData);
	} catch (error) {
		next(error);
	}
};

export const updateComplaint = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { userid } = req.headers;

		const data = req?.body?.reply
			? { ...req.body, replyedBy: userid }
			: req.body;

		const updatedComplaint = await Complaint.findByIdAndUpdate(id, data, {
			new: true,
		});
		if (!updatedComplaint) {
			return res.status(404).json({ message: "Complaint not found" });
		}
		res.status(200).json(updatedComplaint);
	} catch (error) {
		next(error);
	}
};

//Delete a Complaint --Used by Admin --Delete
export const deleteComplaint = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const complaintData = await Complaint.findByIdAndDelete(id);
		if (!complaintData) {
			return res.status(404).json({ message: "Complaint not found" });
		}
		res.status(200).json({ message: "Complaint deleted successfully" });
	} catch (error) {
		next(error);
	}
};
