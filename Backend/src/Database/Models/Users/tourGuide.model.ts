import { schemaConfig } from "#utils";
import { Document, Schema, Types, model } from "mongoose";

export interface ITourGuide extends Document {
	username: string;
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
	itinerary: [Types.ObjectId];
	isVerified: boolean;
}

const tourGuideSchema = new Schema<ITourGuide>(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		mobile: { type: String, required: true },
		picture: { type: String },
		experience: { type: Number },
		prevWork: { type: String },
		// {
		// 	title: { type: String },
		// 	description: { type: String },
		// 	company: { type: String },
		// 	start: { type: Date },
		// 	end: { type: Date },
		// },
		itinerary: [{ type: Schema.Types.ObjectId, ref: "Itinerary" }],
		isVerified: { type: Boolean, default: false },
	},
	schemaConfig,
);

export const TourGuide = model<ITourGuide>("TourGuide", tourGuideSchema);
