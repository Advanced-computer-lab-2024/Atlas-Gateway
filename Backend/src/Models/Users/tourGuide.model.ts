import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";
import { IItinerary } from "../Travel/itinerary.model";

export interface ITourGuide extends Document {
	username: string;
	name: string;
	email: string; // story 3
	password: string;
	mobile: string;
	idPath: string;
	certificatePath: string;
	imagePath: string;
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
	itinerary: Types.ObjectId[] | IItinerary[];
	isVerified: boolean;
	acceptedTerms: boolean;
	isDeleted?: boolean;
	notifications: Types.ObjectId[];
}

const tourGuideSchema = new Schema<ITourGuide>(
	{
		username: { type: String, required: true },
		name: { type: String },
		email: { type: String, required: true },
		password: { type: String, required: true },
		mobile: { type: String, default: "" },
		idPath: { type: String, default: "" },
		certificatePath: { type: String, default: "" },
		imagePath: { type: String, default: "" },
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
		acceptedTerms: { type: Boolean, default: false },
		isDeleted: { type: Boolean, default: false },
		notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
	},
	schemaConfig,
);

export const TourGuide = model<ITourGuide>("TourGuide", tourGuideSchema);
