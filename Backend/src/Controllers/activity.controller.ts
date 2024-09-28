import { Request, Response } from "express";
import { Activity } from "../Database/Models/activity.model";

export const createActivities = async (req: Request, res: Response) => {
  try {
    const activity = Array.isArray(req.body)
      ? await Activity.insertMany(req.body)
      : await Activity.create(req.body);
    res.status(201).send(activity);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating an activity");
  }
};

export const getActivities = async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find();
    res.status(200).send(activities);
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
