import { schemaConfig } from "#utils";
import { Document, Schema, Types, model } from "mongoose";

export interface ISeller extends Document {
	username: string;
	email: string; // story 3
	password: string;
	picture?: string;
	description?: string;
	products?: [Types.ObjectId];
}

const sellerSchema = new Schema<ISeller>(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		picture: { type: String},
		description: { type: String },
		products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
	},
	schemaConfig,
);

export const Seller = model<ISeller>("Seller", sellerSchema);
