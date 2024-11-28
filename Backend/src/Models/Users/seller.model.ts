import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface ISeller extends Document {
	username: string;
	name: string;
	email: string; // story 3
	password: string;
	idPath: string;
	taxCardPath: string;
	imagePath: string;
	description: string;
	isDeleted: boolean;
	isVerified: { type: Boolean; default: false };
	acceptedTerms: { type: Boolean; default: false };
	notifications: Types.ObjectId[];
}

const sellerSchema = new Schema<ISeller>(
	{
		username: { type: String, required: true },
		name: { type: String },
		email: { type: String, required: true },
		password: { type: String, required: true },
		idPath: { type: String, default: "" },
		taxCardPath: { type: String, default: "" },
		imagePath: { type: String, default: "" },
		description: { type: String },
		isVerified: { type: Boolean, default: false },
		acceptedTerms: { type: Boolean, default: false },
		isDeleted: { type: Boolean, default: false },
		notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
	},
	schemaConfig,
);

export const Seller = model<ISeller>("Seller", sellerSchema);
