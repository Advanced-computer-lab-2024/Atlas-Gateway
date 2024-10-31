import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

interface IProduct extends Document {
	sellerId: Types.ObjectId;
	name: string;
	description: string;
	price: number;
	picture: string;
	quantity: number;
	isArchived: boolean;
	sales: number;
	reviews: {
		userId: Types.ObjectId;
		review: string;
		rating: number;
	};
	avgRating: number;
	totalNumberOfRatings: number;
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
		reviews: {
			userId: { type: Schema.Types.ObjectId, required: false },
			review: { type: String, required: false },
			rating: { type: Number, min: 0, max: 5 },
		},
		avgRating: { type: Number, min: 0, max: 5, default: 0 },
		totalNumberOfRatings: { type: Number, default: 0 },
	},
	schemaConfig,
);

export const Product = model<IProduct>("Product", productSchema);
