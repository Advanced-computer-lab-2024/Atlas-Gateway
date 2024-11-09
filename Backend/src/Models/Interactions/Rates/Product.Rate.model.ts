import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../../Config/schemaConfig";

export interface IproductRate extends Document {
	touristId: Types.ObjectId;
	productId: Types.ObjectId;
	value: number;
	text: string;
}
const productRateSchema = new Schema<IproductRate>(
	{
		touristId: { type: Schema.ObjectId, ref: "Tourist" },
		productId: { type: Schema.ObjectId, ref: "Product" },
		value: { type: Number, required: true },
		text: { type: String, default: null },
	},
	schemaConfig,
);
export const ProductRate = model<IproductRate>(
	"ProductRate",
	productRateSchema,
);
