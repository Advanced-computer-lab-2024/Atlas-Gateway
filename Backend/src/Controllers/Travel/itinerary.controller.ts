import { NextFunction, Request, Response } from "express";
import mongoose, { PipelineStage, Types } from "mongoose";

import { Itinerary } from "../../Models/Travel/itinerary.model";
import AggregateBuilder from "../../Services/Operations/aggregation.service";
import { Tourist } from "@/Models/Users/tourist.model";

//Create a new product entry
export const createItinerary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const tourGuideId = req.headers.userid;

		if (!tourGuideId) {
			return res
				.status(400)
				.json({ message: "Tour Guide ID is required" });
		}

		if (!Types.ObjectId.isValid(tourGuideId.toString())) {
			return res.status(400).json({ message: "Invalid Tour Guide ID" });
		}

		const itineraryData = new Itinerary({
			...req.body,
			createdBy: new Types.ObjectId(tourGuideId.toString()),
		});

		await itineraryData.save();
		res.status(200).send(itineraryData);
	} catch (error) {
		next(error);
	}
};

export const getItineraryById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: "Invalid Itinerary ID" });
		}

		const itinerary = await Itinerary.findById(id)
			.populate("tags")
			.populate("createdBy");

		res.status(200).send(itinerary);
	} catch (error) {
		res.status(500).send("Error getting Itinerary by id");
	}
};

export const getItineraryByUserId = async (req: Request, res: Response) => {
	try {
		const tourGuideId = req.headers.userid;

		if (!tourGuideId) {
			return res
				.status(400)
				.json({ message: "Tour Guide ID is required" });
		}
		if (!Types.ObjectId.isValid(tourGuideId.toString())) {
			return res.status(400).json({ message: "Invalid Tour Guide ID" });
		}

		const pipeline: PipelineStage[] = [
			{
				$lookup: {
					from: "tags",
					localField: "tags",
					foreignField: "_id",
					as: "tags",
				},
			},
			{
				$match: {
					createdBy: new Types.ObjectId(tourGuideId.toString()),
				},
			},
			...AggregateBuilder(req.query, ["title", "tags.name"]),
		];

		const result = await Itinerary.aggregate(pipeline);

		const response = {
			data: result?.[0]?.data,
			metaData: {
				page: req.query.page || 1,
				total: result[0]?.total[0]?.count,
				pages: Math.ceil(
					(result[0]?.total[0]?.count ?? 0) /
						(Number(req?.query?.limit) || 10),
				),
			},
		};
		res.status(200).send(response);
	} catch (error) {
		res.status(500).send("Error getting Itinerary by id");
	}
};

export const getItinerary = async (req: Request, res: Response) => {
	try {
		const pipeline: PipelineStage[] = [
			{
				$lookup: {
					from: "tags",
					localField: "tags",
					foreignField: "_id",
					as: "tags",
				},
			},
			...AggregateBuilder(req.query, ["title", "tags.name"]),
		];

		const result = await Itinerary.aggregate(pipeline);

		const response = {
			data: result?.[0]?.data,
			metaData: {
				page: req.query.page || 1,
				total: result[0]?.total[0]?.count,
				pages: Math.ceil(
					(result[0]?.total[0]?.count ?? 0) /
						(Number(req?.query?.limit) || 10),
				),
			},
		};

		res.status(200).send(response);
	} catch (error) {
		res.status(500).send("Error getting Itinerary");
	}
};

export const updateItinerary = async (req: Request, res: Response) => {
	try {
		const itineraryId = req.params.id;

		const itinerary = await Itinerary.findByIdAndUpdate(
			itineraryId,
			{
				$set: req.body,
			},
			{ new: true },
		);

		res.status(200).send(itinerary);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const bookItinerary = async (req: Request, res: Response) => {
    try {
        const itineraryId = req.params.itineraryId;
        const touristId = req.params.touristId;

        if (!Types.ObjectId.isValid(itineraryId)) {
            return res.status(400).json({ message: "Invalid Itinerary ID" });
        }

        const itinerary = await Itinerary.findById(itineraryId);
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        if (!Types.ObjectId.isValid(touristId)) {
            return res.status(400).json({ message: "Invalid Tourist ID" });
        }

        const tourist = await Tourist.findById(touristId);
        if (!tourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }

        if (itinerary.availability <= 0) {
            return res.status(400).json({ message: "No available slots for this itinerary" });
        }

        itinerary.numberOfBookings += 1;
        itinerary.availability -= 1;

        itinerary.tourists.push({
            touristId: tourist.id,
            name: tourist.name,
            mobile: tourist.mobile,
            currency: tourist.currency,
            walletBalance: tourist.walletBalance,
        });

		tourist.bookedItinerary.push(itinerary.id);

		await tourist.save();
        await itinerary.save();

        return res.status(200).json({ message: "Itinerary booked successfully"});
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error booking Itinerary");
    }
};

export const cancelBookingItinerary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const itineraryId = req.params.ItineraryId;
		const touristId = req.params.touristId;

		if (!Types.ObjectId.isValid(itineraryId)) {
			return res.status(400).json({ message: "Invalid Itinerary ID" });
		}

		const itinerary = await Itinerary.findById(itineraryId);
		if (!itinerary) {
			return res.status(404).json({ message: "Itinerary not found" });
		}

		if (!Types.ObjectId.isValid(touristId)) {
			return res.status(400).json({ message: "Invalid Tourist ID" });
		}

		const tourist = await Tourist.findById(touristId);
		if (!tourist) {
			return res.status(404).json({ message: "Tourist not found" });
		}

		const currentDate = new Date();		
		const millisecondsBeforeItinerary = itinerary.startDateTime.getTime() - currentDate.getTime();
		const hoursBeforeItinerary = millisecondsBeforeItinerary / (1000 * 3600);
		
		if (hoursBeforeItinerary >= 48) {
			itinerary.tourists = itinerary.tourists.filter(tourist => tourist.touristId.toString() !== touristId.toString());
			tourist.bookedItinerary = tourist.bookedItinerary.filter(itinerary => itineraryId.toString() !== itineraryId.toString());

			await tourist.save();
			await itinerary.save();

			return res.status(200).send("Booking canceled successfully");
		}
		
		return res.status(505).send("Cannot cancel this Booking");
	} catch (error) {
		next(error);
	}
};

export const deleteItinerary = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid Itinerary ID" });
		}

		const itinerary = await Itinerary.findById(id);
		if (!itinerary) {
			return res.status(404).json({ message: "Itinerary not found" });
		}

		if (itinerary?.numberOfBookings > 0) {
			return res
				.status(404)
				.json({ message: "Itinerary is already booked" });
		}
		await Itinerary.findByIdAndDelete(id);
		res.status(200).send("Itinerary deleted Successfully");
	} catch (error) {
		console.log(error);
		res.status(500).send("Error deleting Itinerary");
	}
};
