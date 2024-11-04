import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../../Config/schemaConfig";

export interface ItourGuideRate extends Document {
	touristId: Types.ObjectId;
	tourGuideId: Types.ObjectId;
	value: number;
}
const tourGuideRateSchema = new Schema<ItourGuideRate>(
	{
		touristId: { type: Schema.ObjectId, ref: "Tourist" },
		tourGuideId: { type: Schema.ObjectId, ref: "TourGuide" },
		value: { type: Number },
	},
	schemaConfig,
);
export const TourGuideRate = model<ItourGuideRate>(
	"TourGuideRate",
	tourGuideRateSchema,
);
