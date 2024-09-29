import { Express, Router } from "express";

import {
	createAdvertiser,
	deleteAdvertiser,
	getAdvertiser,
	updateAdvertiser,
} from "../Controllers/Users/advertiser.controller";

const advertiserRouter = Router();
advertiserRouter.post("/create", createAdvertiser);
advertiserRouter.get("/list", getAdvertiser);
advertiserRouter.put("/update/:id", updateAdvertiser);
advertiserRouter.delete("/delete/:id", deleteAdvertiser);
export default advertiserRouter;
