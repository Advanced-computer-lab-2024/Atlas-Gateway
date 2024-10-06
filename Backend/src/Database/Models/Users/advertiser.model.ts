import { schemaConfig } from "#utils";
import { Document, Schema, Types, model } from "mongoose";

export interface IAdvertiser extends Document {
	username: string;
	email: string; // story 3
	password: string;
	companyProfile: {
		hotline: number;
		address: string;
		website: string;
		logo: string;
		description: string;
	};
	activities: [Types.ObjectId];
	isVerified: { type: Boolean, default: false },
}

const advertiserSchema = new Schema<IAdvertiser>(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		companyProfile: {
			hotline: { type: Number },
			address: { type: String },
			website: { type: String },
			logo: { type: String },
			description: { type: String },
		},
		activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
		isVerified:{type:Boolean,default:false}
	},
	schemaConfig,
);

export const Advertiser = model<IAdvertiser>("Advertiser", advertiserSchema);
