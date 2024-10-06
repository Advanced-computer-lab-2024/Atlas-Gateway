import { Request, Response } from "express";
import { PipelineStage } from "mongoose";

import { Activity } from "../Database/Models/activity.model";
import AggregateBuilder from "../Services/aggregation.service";

export const createActivities = async (req: Request, res: Response) => {
	try {
		const {
			name,
			dateTime,
			location,
			tags,
			category,
			minPrice,
			maxPrice,
			specialDiscounts,
			isOpen,
		} = req.body;
		const activity = await Activity.create({
			name,
			dateTime,
			location,
			tags,
			category,
			minPrice,
			maxPrice,
			specialDiscounts,
			isOpen,
		});
		res.status(201).json(activity);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error creating an activity");
	}
};

export const getActivityById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const activity = await Activity.findById(id
		);
		if (!activity) {
			return res.status(404).send("cant find Activity");
		}
		res.status(200).send(activity);
	} catch (error) {
		console.log(error);
		res.status(500).send("error getting an activity");
	}
}

export const getActivities = async (req: Request, res: Response) => {
	try {
		const pipeline = [
			//need to join the tags and category collections to get the name of the tags and category
			{
				$lookup: {
					from: "tags",
					localField: "tags",
					foreignField: "_id",
					as: "tags",
				},
			},
			{
				$lookup: {
					from: "categories",
					localField: "category",
					foreignField: "_id",
					as: "category",
				},
			},
			...AggregateBuilder(
				req.query,
				["name", "tags.name", "category.name"], // Search fields
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
		res.status(500).send("error getting activities");
	}
};

export const updateActivityById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const activity = await Activity.findById(id);
		if (!activity) {
			return res.status(404).send("cant find Activity");
		}
		activity.set(req.body);
		await activity.save();
		res.status(200).send(activity);
	} catch (error) {
		console.log(error);
		res.status(500).send("error updating an activity");
	}
};

export const deleteActivityById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const activity = await Activity.findByIdAndDelete(id);
		if (!activity) {
			return res.status(404).send("activity not found");
		}
		res.status(200).send("activity deleted successfully");
	} catch (error) {
		console.log(error);
		res.status(500).send("error deleting an activity");
	}
};
