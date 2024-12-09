import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import { SERVER } from "./Config/config";
import connectDB from "./Config/db";
import HttpError from "./Errors/HttpError";
import loginRouter from "./Routes/Auth/login.route";
import passwordRouter from "./Routes/Auth/password.route";
import registerRouter from "./Routes/Auth/register.route";
import flightRouter from "./Routes/Flight/flight.route";
import hotelRouter from "./Routes/Hotel/hotel.route";
import complaintRouter from "./Routes/Interactions/complaint.route";
import notificationRouter from "./Routes/Interactions/notification.route";
import reviewRouter from "./Routes/Interactions/review.route";
import mediaRouter from "./Routes/Media/media.route";
import paymentRouter from "./Routes/Payment/payment.route";
import promoRouter from "./Routes/Promo/promo.route";
import orderRouter from "./Routes/Purchases/order.route";
import productRouter from "./Routes/Purchases/product.route";
import itineraryRouter from "./Routes/Travel/Itinerary.route";
import activityRouter from "./Routes/Travel/activity.route";
import categoryRouter from "./Routes/Travel/category.route";
import placesRouter from "./Routes/Travel/places.route";
import tagRouter from "./Routes/Travel/tag.route";
import transportationRouter from "./Routes/Travel/transportation.route";
import adminRouter from "./Routes/Users/admin.route";
import advertiserRouter from "./Routes/Users/advertiser.route";
import governorRouter from "./Routes/Users/governor.route";
import sellerRouter from "./Routes/Users/seller.route";
import tourGuideRouter from "./Routes/Users/tourGuide.route";
import touristRouter from "./Routes/Users/tourist.route";
import transportation_advertiserRouter from "./Routes/Users/transportation_advertiser.route";
import * as notificationService from "./Services/Interactions/notification.service";

const app = express();

async function startServer() {
	const app = express();
	app.use(express.json());
	app.use(cors());

	app.use((req: Request, res: Response, next: NextFunction) => {
		console.log(`${req.method} ${req.url}`);
		console.log(req.headers);
		console.log(req.body);
		next();
	});

	app.use("/api/admin", adminRouter);
	app.use("/api/governor", governorRouter);
	app.use("/api/products", productRouter);
	app.use("/api/activity", activityRouter);
	app.use("/api/advertiser", advertiserRouter);
	app.use("/api/seller", sellerRouter);
	app.use("/api/tourGuide", tourGuideRouter);
	app.use("/api/category", categoryRouter);
	app.use("/api/tags", tagRouter);
	app.use("/api/tourist", touristRouter);
	app.use("/api/register", registerRouter);
	app.use("/api/itinerary", itineraryRouter);
	app.use("/api/transportation", transportationRouter);
	app.use("/api/places", placesRouter);
	app.use("/api/login", loginRouter);
	app.use("/api/password", passwordRouter);
	app.use("/api/media", mediaRouter);
	app.use("/api/complaint", complaintRouter);
	app.use("/api/transportation_advertiser", transportation_advertiserRouter);
	app.use("/api/flights", flightRouter);
	app.use("/api/hotels", hotelRouter);
	app.use("/api/reviews", reviewRouter);
	app.use("/api/payment", paymentRouter);
	app.use("/api/orders", orderRouter);
	app.use("/api/promo", promoRouter);
	app.use("/api/notification", notificationRouter);
	// Error handling middleware
	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		console.error(err.stack);
		var status = 500;
		if (err instanceof HttpError) {
			status = err.statusCode;
		} else {
			err.message = "Internal Server Error";
		}
		res.status(status).json(err.message);
	});

	const cron = require("node-cron");
	// Schedule the cron job to run every day at midnight
	cron.schedule("0 0 * * *", () =>
		notificationService.notifyOfBookedItineraries(),
	);

	app.listen(SERVER.port, () => {
		console.log(
			`Server is running on http://${SERVER.host}:${SERVER.port}`,
		);
	});
}
export default app;
startServer();

connectDB();
