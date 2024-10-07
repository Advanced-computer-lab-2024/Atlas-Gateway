import { Request, Response } from "express";
import { PipelineStage, Types } from "mongoose";



import { Activity } from "../Database/Models/activity.model";
import AggregateBuilder from "../Services/aggregation.service";


export const createActivities = async (req: Request, res: Response) => {
	try {

		const advertisorId = req.headers.userid;

		if (!advertisorId) {
			return res
				.status(400)
				.json({ message: "Tour Guide ID is required" });
		}

		if (!Types.ObjectId.isValid(advertisorId.toString())) {
			return res.status(400).json({ message: "Invalid Tour Guide ID" });
		}

		const {
			name,
			dateTime,
			location,
			tags,
			categories,
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
			createdBy: new Types.ObjectId(advertisorId.toString()),
			categories,
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

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).send("id is required");
		}

		const activity = await Activity.findById(id)
			.populate("tags")
			.populate("categories");
		if (!activity) {
			return res.status(404).send("cant find Activity");
		}
		res.status(200).send(activity);
	} catch (error) {
		console.log(error);
		res.status(500).send("error getting an activity");
	}
};

export const getActivitybyUserId = async (req: Request, res: Response) => {
	try {
		const tourGuideId = req.headers.userid;

		if (!tourGuideId) {
			return res
				.status(400)
				.json({ message: "Advertisor ID is required" });
		}
		if (!Types.ObjectId.isValid(tourGuideId.toString())) {
			return res.status(400).json({ message: "Invalid Advertisor ID" });
		}

		const activity = await Activity.find({
			createdBy: tourGuideId,
		}).populate("tags");


		const response = {
			data: activity,
			metaData: {
				page: req.query.page || 1,
				total: activity.length,
				pages: Math.ceil(
					(activity.length ?? 0) / (Number(req?.query?.limit) || 10),
				),
			},
		};
		console.log(response);

		res.status(200).send(response);
	} catch (error) {
		res.status(500).send("Error getting Itinerary by id");
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
					as: "tags",
				},
			},
			{
				$lookup: {
					from: "categories",
					localField: "categories",
					foreignField: "_id",
					as: "categories",
				},
			},
			...AggregateBuilder(
				req.query,
				["name", "tags.name", "categories.name"], // Search fields
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

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).send("id is required");
		}
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

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).send("id is required");
		}
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