import { Express, Router } from "express";

import {
	createTourGuide,
	deleteTourGuide,
	getTourGuide,
	updateTourGuide,
} from "../../Controllers/Users/tourGuide.controller";

const tourGuideRouter = Router();
tourGuideRouter.post("/create", createTourGuide);
tourGuideRouter.get("/list", getTourGuide);
tourGuideRouter.put("/update/:id", updateTourGuide);
tourGuideRouter.delete("/delete/:id", deleteTourGuide);
export default tourGuideRouter;
Router;
