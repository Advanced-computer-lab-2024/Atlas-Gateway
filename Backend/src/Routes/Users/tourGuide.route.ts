import { Express, Router } from "express";

import {
	createTourGuide,
	deleteTourGuide,
	getTourGuide,
	getTourGuides,
	updateTourGuide,
	viewItinerary
} from "../../Controllers/Users/tourGuide.controller";

const tourGuideRouter = Router();
tourGuideRouter.post("/create", createTourGuide);
tourGuideRouter.get("/show", getTourGuide);
tourGuideRouter.get("/list", getTourGuides);
tourGuideRouter.put("/update/:id", updateTourGuide);
tourGuideRouter.delete("/delete/:id", deleteTourGuide);
tourGuideRouter.get("/list/:id",viewItinerary)

export default tourGuideRouter;
