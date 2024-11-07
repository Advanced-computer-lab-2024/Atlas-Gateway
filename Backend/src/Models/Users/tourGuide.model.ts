import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

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
	itinerary: Types.ObjectId[];
	isVerified: boolean;
	acceptedTerms: boolean;
	isDeleted?: boolean;
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
		itinerary: [{ type: Schema.Types.ObjectId, ref: "Itinerary" }],
		isVerified: { type: Boolean, default: false },
		acceptedTerms: { type: Boolean, default: false },
		isDeleted: { type: Boolean, default: false },
	},
	schemaConfig,
);

export const TourGuide = model<ITourGuide>("TourGuide", tourGuideSchema);
