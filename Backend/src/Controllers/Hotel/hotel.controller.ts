import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import HttpError from "../../Errors/HttpError";
import { HotelBooking } from "../../Models/Hotel/hotel.model";
import * as hotelService from "../../Services/Hotel/hotel.service";

export const getHotelsByCity = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { cityCode } = req.params;
		const { search } = req.query as { search: string };
		const hotels = await hotelService // horrible
			.getHotelsByCity(cityCode)
			.then((data) =>
				search
					? data.filter((hotel: any) => {
							return hotel.name
								.toLowerCase()
								.includes(search.toLowerCase());
						})
					: data,
			);

		if (!hotels) {
			res.status(200).json(hotels);
		}
		res.status(200).json(hotels);
	} catch (error) {
		next(error);
	}
};

export const showHotelDetails = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new HttpError(400, "Invalid hotel id");
		}
		const hotel = await hotelService.showHotelDetails(id);
		if (!hotel) {
			throw new HttpError(404, "Hotel not found");
		}
		res.status(200).json(hotel);
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
		const hotelBooking = await hotelService.saveHotelOffer(
			offerjson,
			userid as string,
		);
		return res.status(201).json(hotelBooking);
	} catch (error) {
		next(error);
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
		next(error);
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
		await hotelService.deleteHotelBooking(id, userid);

		res.status(200).send("Hotel Booking deleted successfully");
	} catch (error) {
		next(error);
	}
};
