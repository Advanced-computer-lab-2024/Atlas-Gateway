import { Express, Router } from "express";

import {
	createAdvertiser,
	deleteAdvertiser,
	getAdvertiser,
	getAdvertisers,
	softDeleteAdvertiser,
	updateAdvertiser,
	viewActivities,
} from "../../Controllers/Users/advertiser.controller";

const advertiserRouter = Router();
advertiserRouter.post("/create", createAdvertiser);
advertiserRouter.get("/list", getAdvertisers);
advertiserRouter.get("/show/:id", getAdvertiser);
advertiserRouter.put("/update/:id", updateAdvertiser);
advertiserRouter.delete("/delete/:id", deleteAdvertiser);
advertiserRouter.get("/list/:id", viewActivities);
advertiserRouter.delete("/requestDelete/:id", softDeleteAdvertiser);
export default advertiserRouter;
