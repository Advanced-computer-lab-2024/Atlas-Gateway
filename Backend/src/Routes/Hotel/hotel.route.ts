import { Router } from "express";

import {
	bookHotelroom,
	deleteBooking,
	getMyHotelBooking,
	searchHotelOffersController,
} from "../../Controllers/Hotel/hotel.controller";

const router = Router();

router.post("/list", searchHotelOffersController);
router.post("/bookRoom", bookHotelroom);
router.get("/myBookings", getMyHotelBooking);
router.delete("/delete/:id", deleteBooking);
export default router;
