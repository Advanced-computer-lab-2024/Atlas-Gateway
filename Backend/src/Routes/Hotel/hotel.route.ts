import { Router } from "express";

import {
	bookHotelroom,
	deleteBooking,
	getHotelsByCity,
	getMyHotelBooking,
	searchHotelOffersController,
} from "../../Controllers/Hotel/hotel.controller";

const hotelRouter = Router();

hotelRouter.get("/list/:cityCode", getHotelsByCity);
hotelRouter.post("/search", searchHotelOffersController);
hotelRouter.post("/bookRoom", bookHotelroom);
hotelRouter.get("/myBookings", getMyHotelBooking);
hotelRouter.delete("/delete/:id", deleteBooking);
export default hotelRouter;
