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
	bookedItineraries: Types.ObjectId[];
	bookedActivities: Types.ObjectId[];
	bookedTransportations: Types.ObjectId[];
	isDeleted?: boolean;
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
		bookedItineraries: [{ type: Schema.Types.ObjectId, ref: "Itinerary" }],
		bookedActivities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
		bookedTransportations: [
			{ type: Schema.Types.ObjectId, ref: "Transportation" },
			,
		],
		isDeleted: { type: Boolean, default: false },
	},
	schemaConfig,
);

export const Tourist = model<ITourist>("Tourist", touristSchema);
