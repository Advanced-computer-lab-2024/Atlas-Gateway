import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

interface IItinerary extends Document {
	title: string;
	language: string;
	price: number;
	availability: number;
	pickUpLocation: string;
	dropOffLocation: string;
	startDateTime: Date;
	endDateTime: Date;
	activities: [
		{
			activity?: Types.ObjectId;
			title: string;
			dateTime: string;
			durationM: number;
		},
	];
	tags: Types.ObjectId[];
	createdBy: Types.ObjectId;
	numberOfBookings: number;
	reviews: {
		userId: Types.ObjectId;
		review: string;
		rating: number;
	};
	avgRating: number;
	totalNumberOfRatings: number;
	accessibility: string;
	timeline: string;
	tourists: {
		touristId: Types.ObjectId;
		name: string;
		mobile: string;
		currency?: string;
		walletBalance: number;
	}[];
}

const itinerarySchema = new Schema<IItinerary>(
	{
		title: { type: String, required: true },
		language: { type: String, required: true },
		price: { type: Number, required: true },
		availability: { type: Number, required: true },
		pickUpLocation: { type: String, required: true },
		dropOffLocation: { type: String, required: true },
		startDateTime: { type: Date, required: true },
		endDateTime: { type: Date, required: true },
		activities: [
			{
				id: { type: Schema.Types.ObjectId, required: false },
				title: { type: String, required: true },
				dateTime: { type: String, required: true },
				durationM: { type: Number, required: true },
			},
		],
		tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
		createdBy: { type: Schema.Types.ObjectId, ref: "TourGuide" },
		numberOfBookings: { type: Number, default: 0 },
		reviews: {
			userId: { type: Schema.Types.ObjectId, required: false },
			review: { type: String, required: false },
			rating: { type: Number, min: 0, max: 5 },
		},
		avgRating: { type: Number, min: 0, max: 5, default: 0 },
		totalNumberOfRatings: { type: Number, default: 0 },
		accessibility: { type: String, required: true },
		timeline: { type: String, required: true },
		tourists: [
			{
				touristId: { type: Schema.Types.ObjectId, ref: "Tourist" },
				name: { type: String, required: true },
                mobile: { type: String, required: true },
                currency: { type: String, required: true },
				walletBalance: { type: Number, required: true },
			},
		],
	},
	schemaConfig,
);

export const Itinerary = model<IItinerary>("Itinerary", itinerarySchema);
