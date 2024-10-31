import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import { SERVER } from "./Config/config";
import connectDB from "./Config/db";
import HttpError from "./Errors/HttpError";
import loginRouter from "./Routes/Auth/login.route";
import registerRouter from "./Routes/Auth/register.route";
import productRouter from "./Routes/Purchases/product.route";
import itineraryRouter from "./Routes/Travel/Itinerary.route";
import activityRouter from "./Routes/Travel/activity.route";
import categoryRouter from "./Routes/Travel/category.route";
import placesRouter from "./Routes/Travel/places.route";
import tagRouter from "./Routes/Travel/tag.route";
import adminRouter from "./Routes/Users/admin.route";
import advertiserRouter from "./Routes/Users/advertiser.route";
import governorRouter from "./Routes/Users/governor.route";
import sellerRouter from "./Routes/Users/seller.route";
import tourGuideRouter from "./Routes/Users/tourGuide.route";
import touristRouter from "./Routes/Users/tourist.route";
import activityRouter from "./Routes/activity.route";
import categoryRouter from "./Routes/category.route";
import loginRouter from "./Routes/login.route";
import placesRouter from "./Routes/places.route";
import productRouter from "./Routes/product.route";
import registerRouter from "./Routes/register.route";
import tagRouter from "./Routes/tag.route";

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
	app.use("/api/places", placesRouter);
	app.use("/api/login", loginRouter);

	app.get("/", (req: Request, res: Response) => {
		try {
			res.status(200).send("Hello");
		} catch (error) {
			res.status(500).send("How did you possibly mess this up?");
		}
	});

	app.use("", (req: Request, res: Response) => {
		res.status(404).send("Page not found");
	});

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

	app.listen(SERVER.port, () => {
		console.log(
			`Server is running on http://${SERVER.host}:${SERVER.port}`,
		);
	});
}

connectDB();
startServer();
