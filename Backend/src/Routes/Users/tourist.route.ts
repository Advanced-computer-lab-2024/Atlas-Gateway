import { Express, Router } from "express";

import {
	createTourist,
	deleteTourist,
	getTourist,
	getTourists,
	redeemPoints,
	requestActivityNotification,
	requestItineraryNotification,
	softDeleteTourist,
	updateTourist,
	viewUpcomingActivities,
	viewUpcomingItineraries,
	viewWallet,
	viewpastActivities,
	viewpastItineraries,
} from "../../Controllers/Users/tourist.controller";

const touristRouter = Router();
touristRouter.post("/create", createTourist);
touristRouter.get("/show/:id", getTourist);
touristRouter.get("/list", getTourists);
touristRouter.put("/update/:id", updateTourist);
touristRouter.put("/redeem/:id", redeemPoints);
touristRouter.delete("/delete/:id", deleteTourist);
touristRouter.delete("/requestDelete/:id", softDeleteTourist);
touristRouter.get("/wallet", viewWallet);
touristRouter.get("/upcomingActivities", viewUpcomingActivities);
touristRouter.get("/upcomingIitneraries", viewUpcomingItineraries);
touristRouter.get("/pastActivities", viewpastActivities);
touristRouter.get("/pastIitneraries", viewpastItineraries);
touristRouter.get("/ItineraryNotification", requestItineraryNotification);
touristRouter.get("/ActivityNotification", requestActivityNotification);
export default touristRouter;
Router;
