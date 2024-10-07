import { schemaConfig } from "#utils";
import { Document, Schema, Types, model } from "mongoose";

export interface IAdvertiser extends Document {
	name: string;
	username: string;
	email: string; // story 3
	password: string;
	hotline: string;
	website: string;
	description: string;
	// companyProfile: {
	// 	hotline: number;
	// 	address: string;
	// 	website: string;
	// 	logo: string;
	// 	description: string;
	// };
	activities: [Types.ObjectId];
	isVerified: { type: Boolean; default: true };
}

const advertiserSchema = new Schema<IAdvertiser>(
	{
		name: { type: String, required: false },
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		hotline: { type: String },
		website: { type: String },
		description: { type: String },
		activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
		isVerified: { type: Boolean, default: true },
		// companyProfile: {
		// 	hotline: { type: Number },
		// 	address: { type: String },
		// 	website: { type: String },
		// 	logo: { type: String },
		// 	description: { type: String },
		// },
	},
	schemaConfig,
);

export const Advertiser = model<IAdvertiser>("Advertiser", advertiserSchema);
