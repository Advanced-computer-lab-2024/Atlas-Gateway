import express from "express";

import {
	bookItinerary,
	cancelBookingItinerary,
	createItinerary,
	deleteItinerary,
	getItineraries,
	getItineraryById,
	getItineraryByUserId,
	updateItinerary,
} from "../../Controllers/Travel/itinerary.controller";

const router = express.Router();

router.post("/create", createItinerary);
router.get("/list", getItineraries);
router.get("/listTourGuide", getItineraryByUserId);
router.get("/show/:id", getItineraryById);
router.put("/update/:id", updateItinerary);
router.delete("/delete/:id", deleteItinerary);
router.post("/book/:id", bookItinerary);
router.delete("/cancelBooking/:id", cancelBookingItinerary);

export default router;
