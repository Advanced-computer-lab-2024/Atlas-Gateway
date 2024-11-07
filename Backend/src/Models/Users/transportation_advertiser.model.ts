import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface ITransportationAdvertiser extends Document {
	name: string;
	username: string;
	email: string;
	password: string;
	hotline: string;
	website: string;
	description: string;
	idPath: string;
	taxCardPath: string;
	imagePath: string;
	transportations: Types.ObjectId[];
	isVerified: boolean;
	acceptedTerms: boolean;
}

const transportation_advertiserSchema = new Schema<ITransportationAdvertiser>(
	{
		name: { type: String, required: false },
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		hotline: { type: String },
		website: { type: String },
		description: { type: String },
		transportations: [
			{ type: Schema.Types.ObjectId, ref: "Transportation" },
		],
		isVerified: { type: Boolean, default: false },
		idPath: { type: String, default: "" },
		taxCardPath: { type: String, default: "" },
		imagePath: { type: String, default: "" },
		acceptedTerms: { type: Boolean, default: false },
	},
	schemaConfig,
);

export const TransportationAdvertiser = model<ITransportationAdvertiser>(
	"Transportation Advertiser",
	transportation_advertiserSchema,
);
