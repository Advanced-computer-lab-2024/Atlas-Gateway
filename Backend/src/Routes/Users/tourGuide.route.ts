import { Express, Router } from "express";

import {
	Report,
	createTourGuide,
	deleteTourGuide,
	getTourGuide,
	getTourGuides,
	softDeleteTourGuide,
	updateTourGuide,
} from "../../Controllers/Users/tourGuide.controller";

const tourGuideRouter = Router();
tourGuideRouter.post("/create", createTourGuide);
tourGuideRouter.get("/show/:id", getTourGuide);
tourGuideRouter.get("/list", getTourGuides);
tourGuideRouter.put("/update/:id", updateTourGuide);
tourGuideRouter.delete("/delete/:id", deleteTourGuide);
tourGuideRouter.delete("/requestDelete/:id", softDeleteTourGuide);
tourGuideRouter.get("/report/:id", Report);

export default tourGuideRouter;
