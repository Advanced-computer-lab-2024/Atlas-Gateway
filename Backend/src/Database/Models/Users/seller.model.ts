import { schemaConfig } from "#utils";
import { Document, Schema, Types, model } from "mongoose";

export interface ISeller extends Document {
	username: string;
	email: string; // story 3
	password: string;
	picture: string;
	description: string;
	isDeleted: boolean;
	products: [Types.ObjectId];
	isVerified: { type: Boolean, default: false },
}

const sellerSchema = new Schema<ISeller>(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		picture: { type: String, required: true },
		description: { type: String },
		isDeleted: { type: Boolean, default: false },
		products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
		isVerified:{type:Boolean,default:false}
	},
	schemaConfig,
);

export const Seller = model<ISeller>("Seller", sellerSchema);
