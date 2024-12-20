import mongoose, { PipelineStage, Types } from "mongoose";

import * as mailTemplate from "../../Config/mailTemplate";
import HttpError from "../../Errors/HttpError";
import {
	INotification,
	Notification,
} from "../../Models/Interactions/notification.model";
import { Itinerary } from "../../Models/Travel/itinerary.model";
import * as productService from "../../Services/Purchases/product.service";
import * as itineraryService from "../../Services/Travel/itinerary.service";
import * as touristService from "../../Services/Users/tourist.service";
import * as adminService from "../../Services/Users/admin.service";
import * as guideService from "../../Services/Users/tourGuide.service";
import * as sellerService from "../../Services/Users/seller.service";
import * as advertiserService from "../../Services/Users/advertiser.service";
import { transporter } from "../../Config/mail";

export const createNotification = async (notification: INotification) => {
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

	const notification = await Notification.findById(id).populate("notifiedTo");

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
			$sort: { createdAt: -1 },
		},
	];

	const result = await Notification.aggregate(pipeline);

	if (result.length === 0) {
		throw new HttpError(404, "No Notifications Found");
	}

	return result;
};

export const notifyOfFlaggedItinerary = async (
	userId: string,
	userType: string,
	userEmail: string,
	itineraryId: string,
) => {
	if (!Types.ObjectId.isValid(userId)) {
		throw new HttpError(400, "Invalid User ID");
	}

	const itinerary = await itineraryService.getItineraryById(itineraryId);

	if (!itinerary) throw new HttpError(404, "Itinerary not found");

	await transporter.sendMail({
		from: `${process.env.SYSTEM_EMAIL}`,
		to: `${userEmail}`,
		subject: "Itinerary Flagged",
		html: mailTemplate.itineraryFlaggedTemplate(itinerary.title),
	});

	const newNotifi = new Notification({
		type: "Warning",
		message: `Itinerary "${itinerary.title}" has been flagged as inappropriate by the admin`,
		notifiedTo: userId,
		userType: userType,
		isRead: false,
		createdAt: new Date(),
	});

	const notifi = await newNotifi.save();

	if (!notifi) throw new HttpError(400, "Error creating Notification");

	//await notifi.save();

	return notifi;
};

//TODO: Need to push this notification in list of notifications of user
export const notifyOfProductOutOfStock = async (
	userId: string,
	userType: string,
	userEmail: string,
	productId: string,
) => {
	try {
		if (!Types.ObjectId.isValid(userId)) {
			throw new HttpError(400, "Invalid User ID");
		}

		const product = await productService.getProductById(productId);

		if (!product) throw new HttpError(404, "Product not found");

		await transporter.sendMail({
			from: `${process.env.SYSTEM_EMAIL}`,
			to: `${userEmail}`,
			subject: "Product Out of Stock",
			html: mailTemplate.productOutOfStockTemplate(product.name),
		});

		const newNotifi = new Notification({
			type: "Reminder",
			message: `Product "${product.name}" is out of stock`,
			notifiedTo: userId,
			userType: userType,
			isRead: false,
			createdAt: new Date(),
		});

		const notifi = await newNotifi.save();

		if (!notifi) throw new HttpError(400, "Error creating Notification");

		return notifi;
	} catch (error) {
		console.error("Error in notifyOfProductOutOfStock:", error);
	}
};

export const notifyOfUpComingBookedItineraries = async (
	userId: string,
	itineraryId: string,
	userEmail: string,
) => {
	try {
		const itinerary = await itineraryService.getItineraryById(itineraryId);

		const message = `Reminder: Your booked event "${itinerary.title}" is coming up tomorrow!`;

		const notification = new Notification({
			type: "Reminder",
			message: message,
			notifiedTo: userId,
			UserType: "Tourist",
			isRead: false,
			createdAt: new Date(),
		});

		const newNotifi = await notification.save();

		if (!newNotifi)
			throw new HttpError(400, "Couldn't create notification");

		const tourist = await touristService.getTouristById(userId);

		if (!tourist) throw new HttpError(404, "Couldn't find Tourist");

		await transporter.sendMail({
			from: `${process.env.SYSTEM_EMAIL}`,
			to: `${userEmail}`,
			subject: "Upcoming Booked Event",
			html: mailTemplate.itineraryBookingsTemplate(
				itinerary.title,
				itinerary.pickUpLocation,
				itinerary.dropOffLocation,
				itinerary.startDateTime,
			),
		});

		tourist.notifications.push(newNotifi.id);

		await tourist.save();

		return newNotifi;
	} catch (error) {
		console.error("Error in notifyOfUpComingBookedItineraries:", error);
	}
};

const moment = require("moment");
export const notifyOfBookedItineraries = async () => {
	const now = moment();
	const upcomingItineraries = await Itinerary.find({
		startDateTime: { $lte: now.add(2, "days").toDate() }, // Itinerarys within the next 48 hours
		isDeleted: false,
		isAppropriate: true,
		isActive: true,
	});

	for (const itinerary of upcomingItineraries) {
		for (const touristId of itinerary.tourists) {
			const tourist = await touristService.getTouristById(
				touristId.toString(),
			);
			const notification = await notifyOfUpComingBookedItineraries(
				tourist?.id.toString(),
				itinerary.id,
				tourist?.email!,
			);
		}
	}
};

export const markNotificationAsRead = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const notifi = await getNotificationById(id);

	if (!notifi) throw new HttpError(404, "Notification not found");

	notifi.isRead = true;

	const saved = await notifi.save();

	if (!saved) throw new HttpError(401, "Notification not saved");

	return notifi;
};

export const updateNotification = async (
	id: string,
	newNotification: INotification,
) => {
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

export const deleteNotification = async (id: string, userid: string, usertype: string) => {
	if (!Types.ObjectId.isValid(userid)) {
		throw new HttpError(400, "userid is invalid");
	}

	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		const notification = await Notification.findById(id).session(session);
		if (!notification) {
			throw new HttpError(404, "Notification not found");
		}

		if (usertype === "Tourist") {
			const tourist = await touristService.getTouristById(userid);

			if (!tourist) {
				throw new HttpError(404, "Tourist not found");
			}

			await tourist.updateOne(
				{
					$pull: { notifications: id },
				},
				{ session },
			);
		}

		if (usertype === "Admin") {
			const admin = await adminService.getAdminById(userid);

			if (!admin) {
				throw new HttpError(404, "Admin not found");
			}

			await admin.updateOne(
				{
					$pull: { notifications: id },
				},
				{ session },
			);
		}

		if (usertype === "TourGuide") {
			const guide = await guideService.getTourGuideById(userid);

			if (!guide) {
				throw new HttpError(404, "Guide not found");
			}

			await guide.updateOne(
				{
					$pull: { notifications: id },
				},
				{ session },
			);
		}

		if (usertype === "Seller") {
			const seller = await sellerService.getSellerById(userid);

			if (!seller) {
				throw new HttpError(404, "Seller not found");
			}

			await seller.updateOne(
				{
					$pull: { notifications: id },
				},
				{ session },
			);
		}

		if (usertype === "Advertiser") {
			const advertiser = await advertiserService.getAdvertiserById(userid);

			if (!advertiser) {
				throw new HttpError(404, "Advertiser not found");
			}

			await advertiser.updateOne(
				{
					$pull: { notifications: id },
				},
				{ session },
			);
		}

		await notification.deleteOne({ session });

		await session.commitTransaction();

		return notification;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
}