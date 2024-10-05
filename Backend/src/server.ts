import cors from "cors";
import express, { Request, Response } from "express";

import { SERVER } from "./Config/config";
import connectDB from "./Database/db";
import adminRouter from "./Routes/Users/admin.route";
import governorRouter from "./Routes/Users/governor.route";
import sellerRouter from "./Routes/Users/seller.route";
import tourGuideRouter from "./Routes/Users/tourGuide.route";
import tourist from "./Routes/Users/tourist.route";
import activityRouter from "./Routes/activity.route";
import advertiserRouter from "./Routes/Users/advertiser.route";
import categoryRouter from "./Routes/category.route";
import productRouter from "./Routes/product.route";
import touristRouter from "./Routes/Users/tourist.route";
import registerRouter from "./Routes/register.route";
import tourist from "./Routes/Users/tourist.route";
import itineraryRouter from "./Routes/Itinerary.route";
import tagRouter from "./Routes/tag.route";

const app = express();

async function startServer() {
	app.use(express.json());
	app.use(cors());
	app.use("/api/admin", adminRouter);
	app.use("/api/governor", governorRouter);
	app.use("/api/products", productRouter);
	app.use("/api/activity", activityRouter);
	app.use("/api/advertiser", advertiserRouter);
	app.use("/api/seller", sellerRouter);
	app.use("/api/tourGuide", tourGuideRouter);
	app.use("/api/category", categoryRouter);
	app.use("/api/tags", tagRouter);
	app.use("/api/tourist", tourist);
	app.use("/api/register", registerRouter);
	app.use("/api/itinerary", itineraryRouter);


	app.get("/", (req: Request, res: Response) => {
		try {
			res.status(200).send("Hello");
		} catch (error) {
			res.status(400).send("How did you possibly mess this up?");
		}
	});

	app.use("", (req: Request, res: Response) => {
		res.status(404).send("Page not found");
	});

	app.listen(SERVER.port, () => {
		console.log(
			`Server is running on http://${SERVER.host}:${SERVER.port}`,
		);
	});
}

{
	app.use(express.json()); // Used to parse the json dta in the body of any request
}

connectDB();
startServer();
