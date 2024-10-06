import { Express, Router } from "express";

import {
	createTourGuide,
	deleteTourGuide,
	getTourGuide,
	getTourGuides,
	updateTourGuide,
} from "../../Controllers/Users/tourGuide.controller";

const tourGuideRouter = Router();
tourGuideRouter.post("/create", createTourGuide);
tourGuideRouter.get("/show/:id", getTourGuide);
tourGuideRouter.get("/list", getTourGuides);
tourGuideRouter.put("/update/:id", updateTourGuide);
tourGuideRouter.delete("/delete/:id", deleteTourGuide);

export default tourGuideRouter;
