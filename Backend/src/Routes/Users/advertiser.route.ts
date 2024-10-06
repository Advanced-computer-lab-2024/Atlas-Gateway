import { Express, Router } from "express";

import {
	createAdvertiser,
	deleteAdvertiser,
	getAdvertisers,
	updateAdvertiser,
	viewActivities,
} from "../../Controllers/Users/advertiser.controller";

const advertiserRouter = Router();
advertiserRouter.post("/create", createAdvertiser);
advertiserRouter.get("/list", getAdvertisers);
advertiserRouter.put("/update/:id", updateAdvertiser);
advertiserRouter.delete("/delete/:id", deleteAdvertiser);
advertiserRouter.get("/list/:id", viewActivities);
export default advertiserRouter;
