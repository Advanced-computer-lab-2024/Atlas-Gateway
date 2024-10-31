import express from "express";

import {
	createItinerary,
	deleteItinerary,
	getItinerary,
	getItineraryById,
	getItineraryByUserId,
	updateItinerary,
} from "../../Controllers/Travel/itinerary.controller";

const router = express.Router();

router.post("/create", createItinerary);
router.get("/list", getItinerary);
router.get("/listTourGuide", getItineraryByUserId);
router.get("/show/:id", getItineraryById);
router.put("/update/:id", updateItinerary);
router.delete("/delete/:id", deleteItinerary);

export default router;
