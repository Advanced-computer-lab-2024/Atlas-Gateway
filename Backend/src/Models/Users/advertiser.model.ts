import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface IAdvertiser extends Document {
	name: string;
	username: string;
	email: string; // story 3
	password: string;
	hotline: string;
	website: string;
	description: string;
	idPath: string;
	taxCardPath: string;
	imagePath: string;
	// companyProfile: {
	// 	hotline: number;
	// 	address: string;
	// 	website: string;
	// 	logo: string;
	// 	description: string;
	// };
	activities: Types.ObjectId[];
	isVerified: boolean;
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
		isVerified: { type: Boolean, default: false },
		idPath: { type: String, default: "" },
		taxCardPath: { type: String, default: "" },
		imagePath: { type: String, default: "" },
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
