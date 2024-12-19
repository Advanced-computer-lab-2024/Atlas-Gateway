import { Router } from "express";

import {
	bookHotelroom,
	deleteBooking,
	getHotelsByCity,
	getMyHotelBooking,
	showHotelDetails,
} from "../../Controllers/Hotel/hotel.controller";

const hotelRouter = Router();

hotelRouter.get("/list/:cityCode", getHotelsByCity);
hotelRouter.get("/show/:id", showHotelDetails);
hotelRouter.post("/bookRoom", bookHotelroom);
hotelRouter.get("/myBookings", getMyHotelBooking);
hotelRouter.delete("/delete/:id", deleteBooking);
export default hotelRouter;
