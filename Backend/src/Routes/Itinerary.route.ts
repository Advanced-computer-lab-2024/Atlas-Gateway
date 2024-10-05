import express from "express";

import {
	createItinerary,
	deleteItinerary,
	getItinerary,
	getItineraryById,
	updateItinerary,
} from "../Controllers/itinerary.controller";

const router = express.Router();

router.post("/create/:tourGuideId", createItinerary);
router.get("/list", getItinerary);
router.get("/list/:tourGuideId", getItineraryById);
router.put("/update/:tourGuideId/:itineraryId", updateItinerary);
router.delete("/delete/:id", deleteItinerary);

export default router;
