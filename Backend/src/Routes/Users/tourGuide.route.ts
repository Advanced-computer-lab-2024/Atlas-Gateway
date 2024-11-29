import { Express, Router } from "express";

import {
	createTourGuide,
	deleteTourGuide,
	getTourGuide,
	getTourGuides,
	salesReport,
	softDeleteTourGuide,
	updateTourGuide,
} from "../../Controllers/Users/tourGuide.controller";

const router = Router();
router.post("/create", createTourGuide);
router.get("/show/:id", getTourGuide);
router.get("/list", getTourGuides);
router.put("/update/:id", updateTourGuide);
router.delete("/delete/:id", deleteTourGuide);
router.delete("/requestDelete/:id", softDeleteTourGuide);
router.get("/sales/:id", salesReport);

export default router;
