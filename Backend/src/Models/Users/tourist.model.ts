import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface ITourist extends Document {
	name: string;
	username: string;
	email: string; // story 3
	password: string;
	wallet: number; // story 11
	mobile: string;
	nationality: string;
	dob: Date;
	occupation: string;
	address?: string[]; //  story 98 99 Maro comment: Multiple addresses can be added
	currency?: string; // story 51
	loyaltyPoints?: number; // story 70
	profile?: {
		bio?: string;
		location?: string;
		image?: string;
	};
	bookedItinerary: Types.ObjectId[]; // Tourist Can book an Itinerary, So a list to save his booked ones
}

const touristSchema = new Schema<ITourist>(
	{
		name: { type: String },
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		wallet: { type: Number, required: true, default: 0 },
		mobile: { type: String, required: true },
		nationality: { type: String, required: true },
		dob: { type: Date, required: true },
		occupation: { type: String, required: true },
		address: [{ type: String }],
		currency: { type: String },
		loyaltyPoints: { type: Number },
		profile: {
			bio: { type: String },
			location: { type: String },
			image: { type: String },
		},
		bookedItinerary: [{ type: Schema.Types.ObjectId, ref: "Itinerary" }],
	},
	schemaConfig,
);

export const Tourist = model<ITourist>("Tourist", touristSchema);
