import mongoose, { PipelineStage, Types } from "mongoose";
import nodemailer from "nodemailer";

import HttpError from "../../Errors/HttpError";
import { Notification, INotification } from "../../Models/Interactions/notification.model";
import * as productService from "../../Services/Purchases/product.service";
import * as activityService from "../../Services/Travel/activity.service";
import * as itineraryService from "../../Services/Travel/itinerary.service";
import * as touristService from "../../Services/Users/tourist.service";
import { Itinerary } from "../../Models/Travel/itinerary.model";

export const createNotification = async (
    notification: INotification,
) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const notificationData = new Notification({
            ...notification,
        });

        if (!notificationData)
            throw new HttpError(400, "Couldn't create Notification");

        await notificationData.save({ session }); // Save to generate the ID

        await session.commitTransaction();

        return notificationData;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

export const getNotificationById = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new HttpError(400, "Invalid Notification ID");
    }

    const notification = await Notification.findById(id)
        .populate("notifiedTo");

    if (!notification) {
        throw new HttpError(404, "Notification not Found");
    }

    return notification;
};

export const getNotificationsByUserId = async (userId: string) => {
    if (!Types.ObjectId.isValid(userId)) {
        throw new HttpError(400, "Invalid User ID");
    }

    const pipeline: PipelineStage[] = [
        {
            $match: {
                notifiedTo: new Types.ObjectId(userId),
            },
        },
        {
            $sort: { createdAt: -1 }
        }
    ];

    const result = await Notification.aggregate(pipeline);

    if (result.length === 0) {
        throw new HttpError(404, "No Notifications Found");
    }

    return result;
};

const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service (e.g., SendGrid, SES)
    auth: {
        user: 'atlasgateway9@gmail.com',
        pass: 'atlasGate9',
    },
});

export const sendEmailNotification = async (userEmail: string, emailSubject: string, emailBody: string) => {
    try {
        await transporter.sendMail({
            from: 'atlasgateway9@gmail.com',
            to: userEmail,
            subject: emailSubject,
            html: emailBody, // Email body in HTML format
        });

        console.log(`Email sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email notification');
    }
};

export const notifyOfFlaggedItinerary = async (userId: string, userType: string, userEmail: string, itineraryId: string) => {
    if (!Types.ObjectId.isValid(userId)) {
        throw new HttpError(400, "Invalid User ID");
    }

    const itinerary = await itineraryService.getItineraryById(itineraryId);

    if (!itinerary)
        throw new HttpError(404, "Itinerary not found");

    const emailSubject = `Reminder: Your upcoming event "${itinerary.title}"`;

    const emailBody = `<h1>Reminder: Your booked event "${itinerary.title}" is coming up soon!</h1>
        <p><strong>Event:</strong> ${itinerary.title}</p>
        <p><strong>Location:</strong> ${itinerary.pickUpLocation} - ${itinerary.dropOffLocation}</p>
        <p><strong>Start Time:</strong> ${itinerary.startDateTime}</p>
        <p>We hope you enjoy your trip!<br>Safe travels!</p>`;

    await sendEmailNotification(userEmail, emailSubject, emailBody);

    const newNotifi = new Notification({
        type: "Warning",
        message: `Itinerary "${itinerary.title}" has been flagged as inapproriate by the admin`,
        notifiedTo: userId,
        userType: userType,
        isRead: false,
        createdAt: new Date(),
    });

    const notifi = await createNotification(newNotifi);

    if (!notifi)
        throw new HttpError(400, "Error creating Notification");

    //await notifi.save();

    return notifi;
};

//TODO: Need to push this notification in list of notifications of user
export const notifyOfProductOutOfStock = async (userId: string, userType: string, userEmail: string, productId: string) => {
    if (!Types.ObjectId.isValid(userId)) {
        throw new HttpError(400, "Invalid User ID");
    }

    const product = await productService.getProductById(productId);

    if (!product)
        throw new HttpError(404, "Product not found");

    const emailSubject = `Urgent: The product "${product.name}" is out of stock`;

    const emailBody = `<h1>Warning: The product "${product.name}" is out of stock!</h1>
        <p><strong>Product:</strong> ${product.name}</p>
        <p>This product is currently unavailable for sale due to stock depletion. Please update your inventory or take appropriate action.</p>
        <p>If you need any assistance, feel free to contact support.</p>
        <p>Best regards,<br>Your Team</p>`;

    await sendEmailNotification(userEmail, emailSubject, emailBody);

    const newNotifi = new Notification({
        type: "Reminder",
        message: `Product "${product.name}" is out of stock`,
        notifiedTo: userId,
        userType: userType,
        isRead: false,
        createdAt: new Date(),
    });

    const notifi = await createNotification(newNotifi);

    if (!notifi)
        throw new HttpError(400, "Error creating Notification");

    //await notifi.save();

    return notifi;
};

export const notifyOfUpComingBookedItineraries = async (userId: string, itineraryId: string) => {
    try {
        const itinerary = await itineraryService.getItineraryById(itineraryId);

        const message = `Reminder: Your booked event "${itinerary.title}" is coming up tomorrow!`;

        const notification = new Notification({
            type: 'Reminder',
            message: message,
            notifiedTo: userId,
            UserType: "Tourist",
            isRead: false,
            createdAt: new Date(),
        });

        const newNotifi = await createNotification(notification);

        if (!newNotifi)
            throw new HttpError(400, "Couldn't create notification");

        const tourist = await touristService.getTouristById(userId);

        if (!tourist)
            throw new HttpError(404, "Couldn't find Tourist");

        const emailSubject = `Reminder: Your upcoming event "${itinerary.title}"`;

        const emailBody = `
                <h1>Reminder: Your booked event "${itinerary.title}" is coming up soon!</h1>
                <p><strong>Event:</strong> ${itinerary.title}</p>
                <p><strong>Location:</strong> ${itinerary.pickUpLocation} - ${itinerary.dropOffLocation}</p>
                <p><strong>Start Time:</strong> ${itinerary.startDateTime}</p>
                <p>We hope you enjoy your trip!<br>Safe travels!</p>`;

        await sendEmailNotification(tourist.email, emailSubject, emailBody);

        tourist.notifications.push(newNotifi.id);

        await tourist.save();

        return newNotifi;
    } catch (error) {
        console.error("Error in notifyOfUpComingBookedItineraries:", error);
    }
};

const moment = require('moment');
export const notifyOfBookedItineraries = async () => {
    const now = moment();
    const upcomingItineraries = await Itinerary.find({
        startDateTime: { $lte: now.add(2, 'days').toDate() }, // Itinerarys within the next 48 hours
        isDeleted: false,
        isAppropriate: true,
        isActive: true,
    });

    for (const itinerary of upcomingItineraries) {
        for (const touristId of itinerary.tourists) {
            const tourist = await touristService.getTouristById(touristId.toString());
            const notification = await notifyOfUpComingBookedItineraries(tourist?.id.toString(), itinerary.id);
        }
    }
}

export const markNotificationAsRead = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new HttpError(400, "id is invalid");
    }

    const notifi = await getNotificationById(id);

    if (!notifi)
        throw new HttpError(404, "Notification not found");

    notifi.isRead = true;

    const saved = await notifi.save();

    if (!saved)
        throw new HttpError(401, "Notification not saved");

    return notifi;
};

export const updateNotification = async (id: string, newNotification: INotification) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new HttpError(400, "id is invalid");
    }

    const notification = await Notification.findByIdAndUpdate(
        id,
        newNotification,
        {
            new: true,
        },
    );

    return notification;
};