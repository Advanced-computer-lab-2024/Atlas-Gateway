import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../../Config/schemaConfig";

export interface IitinerarytRate extends Document {
	touristId: Types.ObjectId;
	itineraryId: Types.ObjectId;
	value: number;
}
const itineraryRateSchema = new Schema<IitinerarytRate>(
	{
		touristId: { type: Schema.ObjectId, ref: "Tourist" },
		itineraryId: { type: Schema.ObjectId, ref: "Itinerary" },
		value: { type: Number },
	},
	schemaConfig,
);
export const ItineraryRate = model<IitinerarytRate>(
	"ItineraryRate",
	itineraryRateSchema,
);
