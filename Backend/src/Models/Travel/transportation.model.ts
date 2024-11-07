import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface ITransportation extends Document {
	type: string;
	price: number;
	availability: number;
	pickUpLocation: string;
	dropOffLocation: string;
	dateTime: Date;
	timeTaken: number;
	numberOfBookings: number;
	tourists: Types.ObjectId[];
	createdBy: Types.ObjectId;
}

const transportationSchema = new Schema<ITransportation>(
	{
		type: { type: String, required: true },
		price: { type: Number, required: true },
		availability: { type: Number, required: true },
		pickUpLocation: { type: String, required: true },
		dropOffLocation: { type: String, required: true },
		dateTime: { type: Date, required: true },
		timeTaken: { type: Number, required: true },
		numberOfBookings: { type: Number, default: 0 },
		tourists: [{ type: Schema.Types.ObjectId, ref: "Tourist" }],
		createdBy: { type: Schema.Types.ObjectId, ref: "Advertiser" },
	},
	schemaConfig,
);

export const Transportation = model<ITransportation>(
	"Transportation",
	transportationSchema,
);
