import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface IPayment extends Document {
	type: string;
	itinerary: Types.ObjectId;
	activity: Types.ObjectId;
	payer: Types.ObjectId;
}

const paymentSchema = new Schema<IPayment>(
	{
		type: { type: String, required: true },
		itinerary: { type: Schema.Types.ObjectId, ref: "Itinerary" },
		activity: { type: Schema.Types.ObjectId, ref: "Activity" },
		payer: { type: Schema.Types.ObjectId, ref: "Tourist" },
	},
	schemaConfig,
);

export const Payment = model<IPayment>("Payment", paymentSchema);
