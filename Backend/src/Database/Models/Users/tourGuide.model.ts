import { schemaConfig } from "#utils";
import { Document, Schema, Types, model } from "mongoose";

export interface ITourGuide extends Document {
	username: string;
	email: string; // story 3
	password: string;
	description: string;
	picture: string;
	experience: string;
	previous: {
		title: string;
		description: string;
		company: string;
		start: Date;
		end: Date;
	};
	itinerary: [Types.ObjectId];
	isVerified: boolean;
}

const tourGuideSchema = new Schema<ITourGuide>(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		description: { type: String },
		picture: { type: String },
		experience: { type: String },
		previous: {
			title: { type: String },
			description: { type: String },
			company: { type: String },
			start: { type: Date },
			end: { type: Date },
		},
		itinerary: [{ type: Schema.Types.ObjectId, ref: "Itinerary" }],
		isVerified: { type: Boolean, default: false },
	},
	schemaConfig,
);

export const TourGuide = model<ITourGuide>("TourGuide", tourGuideSchema);
