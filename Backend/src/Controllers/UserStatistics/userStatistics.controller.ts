import { NextFunction, Request, Response } from "express";

import { Advertiser } from "../../Models/Users/advertiser.model";
import { Governor } from "../../Models/Users/governor.model";
import { Seller } from "../../Models/Users/seller.model";
import { TourGuide } from "../../Models/Users/tourGuide.model";
import { Tourist } from "../../Models/Users/tourist.model";

export const viewNumberOfUser = async (req: Request, res: Response) => {
	try {
		const govCount = await Governor.countDocuments();
		const advertiserCount = await Advertiser.countDocuments();
		const touristCount = await Tourist.countDocuments();
		const tourguideCount = await TourGuide.countDocuments();
		const sellerCount = await Seller.countDocuments();
		const total =
			govCount +
			advertiserCount +
			tourguideCount +
			touristCount +
			sellerCount;
		console.log(total);
		const currentYear = new Date().getFullYear();
		const currentMonth = new Date().getMonth() + 1;
		const filter = {
			$expr: {
				$and: [
					{ $eq: [{ $year: "$createdAt" }, currentYear] },
					{ $eq: [{ $month: "$createdAt" }, currentMonth] },
				],
			},
		};
		const newGov = await Governor.countDocuments(filter);
		const newadv = await Advertiser.countDocuments(filter);
		const newtourist = await Tourist.countDocuments(filter);
		const newtourguide = await TourGuide.countDocuments(filter);
		const newseller = await Seller.countDocuments(filter);
		const newTotal =
			newGov + newadv + newseller + newtourguide + newtourist;

		res.status(200).json({ total, newTotal });
	} catch (error) {
		res.sendStatus(500);
	}
};
