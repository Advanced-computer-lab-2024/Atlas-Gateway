import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface ITourist extends Document {
	name: string;
	username: string;
	email: string;
	password: string;
	walletBalance: number;
	mobile: string;
	nationality: string;
	dob: Date;
	occupation: string;
	address?: string[];
	currency?: string;
	loyaltyPoints?: number;
	profile?: {
		bio?: string;
		location?: string;
		image?: string;
	};
	bookedItineraries: Schema.Types.ObjectId[];
	bookedActivities: Schema.Types.ObjectId[];
	bookedTransportations: Schema.Types.ObjectId[];
}

const touristSchema = new Schema<ITourist>(
	{
		name: { type: String },
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		walletBalance: { type: Number, required: true, default: 0 },
		mobile: { type: String, required: true },
		nationality: { type: String, required: true },
		dob: { type: Date, required: true },
		occupation: { type: String, required: true },
		address: [{ type: String }],
		currency: { type: String, default: "EGP" },
		loyaltyPoints: { type: Number, default: 0 },
		profile: {
			bio: { type: String },
			location: { type: String },
			image: { type: String },
		},
		bookedItineraries: [{ type: Types.ObjectId, ref: "Itinerary" }],
		bookedActivities: [{ type: Types.ObjectId, ref: "Activity" }],
		bookedTransportations: [{ type: Types.ObjectId, ref: "Transportation" }],
	},
	schemaConfig,
);

export const Tourist = model<ITourist>("Tourist", touristSchema);
