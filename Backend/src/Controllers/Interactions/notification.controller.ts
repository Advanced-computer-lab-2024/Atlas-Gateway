import { NextFunction, Request, Response } from "express";
import { PipelineStage, Types } from "mongoose";

import * as notificationService from "../../Services/Interactions/notification.service";
import { Notification } from "../../Models/Interactions/notification.model";
import { filterByNotificationReadStatus } from "../../Services/Operations/Filter/filterBuilder.service";

//Create a Notification 
export const createNotification = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const newNotification = await notificationService.createNotification({
            ...req.body,
        });
        if (!newNotification)
            res.status(401).json("Couldn't create new Notification");

        res.status(201).json(newNotification);
    } catch (error) {
        next(error);
    }
};

//Get all Notifications: mainly for testing
export const getAllNotifications = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const notifications = await Notification.find({});
        
        if (!notifications)
			return res.status(404).send("No Notifications found");

        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
};

//Get all Notifications by Notified To
export const getNotificationsByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId = req.headers.userid;

        if (!userId)
            return res
                .status(400)
                .json({ message: "User ID is required" });

                const notifications = await notificationService.getNotificationsByUserId(userId.toString());

        if (!notifications)
            return res.status(401).json("No Notifications found");

        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
};

//Get a Notification by ID
export const getNotificationById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const notificationData = await Notification.findById(id)
            .populate("notifiedTo");

        if (!notificationData) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.status(200).json(notificationData);
    } catch (error) {
        next(error);
    }
};

//Mark Notification as Read
export const markNotificationAsRead = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id= req.params.id;
        const result = await notificationService.markNotificationAsRead(id);
        if (!result)
            res.status(401).json("Couldn't mark Notification as read");

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

//Update a Notification
export const updateNotificationById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const notificationId = req.params.id;

        if (!Types.ObjectId.isValid(notificationId)) {
            return res
                .status(400)
                .json({ message: "Invalid Notification ID" });
        }

        const notification = await notificationService.updateNotification(
            notificationId,
            req.body,
        );

        res.status(200).send(notification);
    } catch (error) {
        next(error);
    }
};

//Delete a Notification
export const deleteNotification = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const notificationData = await Notification.findByIdAndDelete(id);
        if (!notificationData) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        next(error);
    }
};
