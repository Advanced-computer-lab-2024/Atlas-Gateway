import express from "express";

import {
	createItinerary,
	deleteItinerary,
	getItineraries,
	getItineraryById,
	getItineraryByUserId,
	updateItinerary,
	bookItinerary,
	cancelBookingItinerary,
} from "../../Controllers/Travel/itinerary.controller";

const router = express.Router();

router.post("/create", createItinerary);
router.get("/list", getItineraries);
router.get("/listTourGuide", getItineraryByUserId);
router.get("/show/:id", getItineraryById);
router.put("/update/:id", updateItinerary);
router.put("/book/:id/:id", bookItinerary);
router.put("/cancel/:id/:id", cancelBookingItinerary);
router.delete("/delete/:id", deleteItinerary);

export default router;
