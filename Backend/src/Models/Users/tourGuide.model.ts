import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface ITourGuide extends Document {
	username: string;
	name: string;
	email: string; // story 3
	password: string;
	mobile: string;
	picture: string;
	experience: number;
	prevWork: string;
	// {
	// 	title: string;
	// 	description: string;
	// 	company: string;
	// 	start: Date;
	// 	end: Date;
	// };
	avgRating: number;
	totalNumberOfRatings: number;
	itinerary: [Types.ObjectId];
	isVerified: boolean;
}

const tourGuideSchema = new Schema<ITourGuide>(
	{
		username: { type: String, required: true },
		name: { type: String },
		email: { type: String, required: true },
		password: { type: String, required: true },
		mobile: { type: String, default: "" },
		picture: { type: String, default: "" },
		experience: { type: Number, default: 0 },
		prevWork: { type: String, default: "" },
		// {
		// 	title: { type: String },
		// 	description: { type: String },
		// 	company: { type: String },
		// 	start: { type: Date },
		// 	end: { type: Date },
		// },
		avgRating: { type: Number, default: 0 },
		totalNumberOfRatings: { type: Number, default: 0 },
		itinerary: [{ type: Schema.Types.ObjectId, ref: "Itinerary" }],
		isVerified: { type: Boolean, default: false },
	},
	schemaConfig,
);

export const TourGuide = model<ITourGuide>("TourGuide", tourGuideSchema);
