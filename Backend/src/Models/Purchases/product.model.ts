import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";
import { IAdmin } from "../Users/admin.model";
import { ISeller } from "../Users/seller.model";

export interface IProduct extends Document {
	sellerId: Types.ObjectId | ISeller;
	name: string;
	description: string;
	price: number;
	imagePath: string;
	quantity: number;
	isArchived: boolean;
	sales: number;
	avgRating: number;
	totalNumberOfRatings: number;
	touristWishlist: Types.ObjectId[];
	isDeleted?: boolean;
}

export const productSchema = new Schema<IProduct>(
	{
		sellerId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Seller",
		},
		name: { type: String, required: true },
		description: { type: String },
		price: { type: Number, required: true },
		imagePath: { type: String },
		quantity: { type: Number, required: true },
		isArchived: { type: Boolean, default: false },
		sales: { type: Number, default: 0 },
		avgRating: { type: Number, min: 0, max: 5, default: 0 },
		totalNumberOfRatings: { type: Number, default: 0 },
		touristWishlist: [{ type: Schema.Types.ObjectId, ref: "Tourist" }],
		isDeleted: { type: Boolean, default: false },
	},
	schemaConfig,
);

export const Product = model<IProduct>("Product", productSchema);
