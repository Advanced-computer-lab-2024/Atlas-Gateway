import { schemaConfig } from "#utils";
import { Document, Schema, Types, model } from "mongoose";

interface IProduct extends Document {
	sellerId: Types.ObjectId;
	name: string;
	description: string;
	price: number;
	picture: string;
	quantity: number;
	isArchived: boolean;
	sales: number;
	rating: number;
	review: string;
}

const productSchema = new Schema<IProduct>(
	{
		sellerId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Seller",
		},
		name: { type: String, required: true },
		description: { type: String },
		price: { type: Number, required: true },
		picture: { type: String, required: true },
		quantity: { type: Number, required: true },
		isArchived: { type: Boolean },
		sales: { type: Number },
		rating: { type: Number },
		review: { type: String },
	},
	schemaConfig,
);

export const Product = model<IProduct>("Product", productSchema);
