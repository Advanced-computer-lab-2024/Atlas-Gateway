import { Express, Router } from "express";

import {
	createTransportationAdvertiser,
	deleteTransportationAdvertiser,
	getTransportationAdvertiser,
	getTransportationAdvertisers,
	updateTransportationAdvertiser,
} from "../../Controllers/Users/transportation_advertiser.controller";

const transportation_advertiserRouter = Router();
transportation_advertiserRouter.post("/create", createTransportationAdvertiser);
transportation_advertiserRouter.get("/list", getTransportationAdvertisers);
transportation_advertiserRouter.get("/show/:id", getTransportationAdvertiser);
transportation_advertiserRouter.put(
	"/update/:id",
	updateTransportationAdvertiser,
);
transportation_advertiserRouter.delete(
	"/delete/:id",
	deleteTransportationAdvertiser,
);
export default transportation_advertiserRouter;
