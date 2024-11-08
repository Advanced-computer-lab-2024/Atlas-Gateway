import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../../Config/schemaConfig";

export interface IactivitytRate extends Document {
	touristId: Types.ObjectId;
	activityId: Types.ObjectId;
	value: number;
}
const activityRateSchema = new Schema<IactivitytRate>(
	{
		touristId: { type: Schema.ObjectId, ref: "Tourist" },
		activityId: { type: Schema.ObjectId, ref: "Activity" },
		value: { type: Number },
	},
	schemaConfig,
);
export const ActivityRate = model<IactivitytRate>(
	"ActivityRate",
	activityRateSchema,
);
