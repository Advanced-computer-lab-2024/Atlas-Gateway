import { Request, Response } from "express";
import { PipelineStage } from "mongoose";

import { Activity } from "../Database/Models/activity.model";
import AggregateBuilder from "../Services/aggregation.service";

export const createActivities = async (req: Request, res: Response) => {
	try {
		const activity = await Activity.create(req.body);
		res.status(201).send(activity);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error creating an activity");
	}
};

export const getActivities = async (req: Request, res: Response) => {
	try {
		const pipeline = [
			//need to join the tags and category collections to get the name of the tags and category
			{
				$lookup: {
					from: "tags",
					localField: "tags",
					foreignField: "_id",
					as: "tagsData",
				},
			},
			{
				$lookup: {
					from: "categories",
					localField: "category",
					foreignField: "_id",
					as: "categoryData",
				},
			},
			...AggregateBuilder(
				req.query,
				["name", "tagsData.name", "categoryData.name"], // Search fields
			),
		];

		const result = await Activity.aggregate(pipeline);

		if (result[0].data.length === 0) {
			return res
				.status(404)
				.json({ message: "No matching Activities Found" });
		}

		const response = {
			data: result[0].data,
			metaData: {
				page: req.query.page || 1,
				total: result[0].total[0].count,
				pages: Math.ceil(
					result[0].total[0].count / (Number(req.query.limit) || 10),
				),
			},
		};
		res.status(200).send(response);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error getting all activities");
	}
};

export const updateActivityById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const activity = await Activity.findById(id);
		if (!activity) {
			return res.status(404).send("Cant find Activity");
		}
		activity.set(req.body);
		await activity.save();
		res.status(200).send(activity);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error updating an activity");
	}
};

export const deleteActivityById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await Activity.findByIdAndDelete(id);
		res.status(200).send("Activity Deleted Successfully");
	} catch (error) {
		console.log(error);
		res.status(500).send("Error deleting an activity");
	}
};
