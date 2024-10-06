import express from "express";

import {
	createItinerary,
	deleteItinerary,
	getItinerary,
	getItineraryById,
	updateItinerary,
} from "../Controllers/itinerary.controller";

const router = express.Router();

router.post("/create", createItinerary);
router.get("/list", getItinerary);
router.get("/show/:id", getItineraryById);
router.put("/update/:id", updateItinerary);
router.delete("/delete/:id", deleteItinerary);

export default router;
