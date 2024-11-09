import express from "express";

import {
	bookItinerary,
	cancelBookingItinerary,
	createItinerary,
	deleteItinerary,
	flagItinerary,
	getItineraries,
	getItineraryById,
	getItineraryByUserId,
	toggleStatus,
	updateItinerary,
} from "../../Controllers/Travel/itinerary.controller";

const router = express.Router();

router.post("/create", createItinerary);
router.get("/list", getItineraries);
router.get("/listTourGuide", getItineraryByUserId);
router.get("/show/:id", getItineraryById);
router.put("/update/:id", updateItinerary);
router.put("/flag/:id", flagItinerary);
router.put("/toggleStatus/:id", toggleStatus);
router.delete("/delete/:id", deleteItinerary);
router.post("/book/:id", bookItinerary);
router.post("/cancelBooking/:id", cancelBookingItinerary);

export default router;
