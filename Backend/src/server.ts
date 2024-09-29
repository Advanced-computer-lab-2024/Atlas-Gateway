import express, { Request, Response } from "express";
import { SERVER } from "./Config/config";
import connectDB from "./Database/db";
import activityRouter from "./Routes/activity.route";
import productRouter from "./Routes/product.route";
import adminRouter from "./Routes/Users/admin.route";
import governorRouter from './Routes/Users/governor.route';

const app = express();

async function startServer() {
	app.use(express.json());
	app.use("/api/admin",adminRouter);
	app.use("/api/governor",governorRouter);
	app.use("/api/products", productRouter);
	app.use("/api/activity", activityRouter);
	app.listen(SERVER.port, () => {
		console.log(
			`Server is running on http://${SERVER.host}:${SERVER.port}`,
		);
	});
}

{
	app.use(express.json()); // Used to parse the json dta in the body of any request

	app.get("/", (req: Request, res: Response) => {
		try {
			res.status(200).send("Hello");
		} catch (error) {
			res.status(400).send("How did you possibly mess this up?");
		}
	});
}
connectDB();
startServer();
