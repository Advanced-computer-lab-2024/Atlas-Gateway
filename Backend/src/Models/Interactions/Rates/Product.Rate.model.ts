import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../../Config/schemaConfig";

export interface IproductRate extends Document {
	touristId: Types.ObjectId;
	productId: Types.ObjectId;
	value: number;
}
const productRateSchema = new Schema<IproductRate>(
	{
		touristId: { type: Schema.ObjectId, ref: "Tourist" },
		productId: { type: Schema.ObjectId, ref: "Product" },
		value: { type: Number },
	},
	schemaConfig,
);
export const TourGuideRate = model<IproductRate>(
	"ProductRate",
	productRateSchema,
);
