import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";
import { IActivity } from "../Travel/activity.model";

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
	activities: Types.ObjectId[] | IActivity[];
	isVerified: boolean;
	acceptedTerms: boolean;
	isDeleted: boolean;
	notifications: Types.ObjectId[];
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
		acceptedTerms: { type: Boolean, default: false },
		isDeleted: { type: Boolean, default: false },
		notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
	},
	schemaConfig,
);

export const Advertiser = model<IAdvertiser>("Advertiser", advertiserSchema);
