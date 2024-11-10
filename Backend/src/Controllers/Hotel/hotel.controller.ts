import { NextFunction, Request, Response } from "express";

import { searchHotelOffers } from "../../Services/Hotel/hotel.service";

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
