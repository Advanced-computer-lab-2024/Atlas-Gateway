import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { HotelBooking } from "../../Models/Hotel/hotel.model";
import {
	deleteHotelBooking,
	saveHotelOffer,
	searchHotelOffers,
} from "../../Services/Hotel/hotel.service";

export const searchHotelOffersController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { cityCode, checkInDate, checkOutDate, adults, page } = req.body;

		if (!cityCode || !checkInDate || !checkOutDate || !adults) {
			return res
				.status(400)
				.json({ error: "Missing required parameters" });
		}

		const adultsNumber = parseInt(adults as string, 10);
		if (isNaN(adults) || adultsNumber <= 0) {
			return res.status(400).json({ error: "Invalid number of adults" });
		}

		const pageNumber = page ? parseInt(page as string, 10) : 1;
		if (isNaN(pageNumber) || pageNumber <= 0) {
			return res.status(400).json({ error: "Invalid page number" });
		}

		const offers = await searchHotelOffers({
			cityCode: cityCode as string,
			checkInDate: checkInDate as string,
			checkOutDate: checkOutDate as string,
			adults: adults,
			page: pageNumber,
		});

		return res.status(200).json(offers);
	} catch (error) {
		next(error);
	}
};
export const bookHotelroom = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const offerjson = req.body;
	const userid = req.headers.userid;
	if (!userid) {
		return res.status(400).json({ error: "Missing required parameters" });
	}
	try {
		const hotelBooking = await saveHotelOffer(offerjson, userid as string);
		return res.status(201).json(hotelBooking);
	} catch (error) {
		console.error("Error in bookHotelroom:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
export const getMyHotelBooking = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const userid = req.headers.userid;
	if (!userid) {
		return res.status(400).json({ error: "Missing required parameters" });
	}

	try {
		const hotelBookings = await HotelBooking.find({ touristID: userid });
		return res.status(201).json(hotelBookings);
	} catch (error) {
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
export const deleteBooking = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		const userid = req.headers.userid;
		if (!userid) {
			return res
				.status(400)
				.json({ error: "Missing required parameters" });
		}
		await deleteHotelBooking(id, userid);

		res.status(200).send("Hotel Booking deleted successfully");
	} catch (error) {
		console.error("Error in bookHotelroom:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
