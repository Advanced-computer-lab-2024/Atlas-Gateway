import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface IPromo extends Document {
	promoCode: string;
	discountPercentage: number;
	expiryDate: Date;
	allUsers: boolean;
	users: Types.ObjectId[];
}

const promoSchema = new Schema<IPromo>(
	{
		promoCode: { type: String, required: true },
		discountPercentage: { type: Number, required: true, min: 0, max: 100 },
		expiryDate: { type: Date, required: true },
		allUsers: { type: Boolean, required: true },
		users: [{ type: Schema.Types.ObjectId, ref: "Tourist" }],
	},
	schemaConfig,
);

export const promo = model<IPromo>("promo", promoSchema);
