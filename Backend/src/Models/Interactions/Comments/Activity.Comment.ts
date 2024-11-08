import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../../Config/schemaConfig";

export interface IactivitytComment extends Document {
	touristId: Types.ObjectId;
	activityId: Types.ObjectId;
	text: string;
}
const activityCommentSchema = new Schema<IactivitytComment>(
	{
		touristId: { type: Schema.ObjectId, ref: "Tourist" },
		activityId: { type: Schema.ObjectId, ref: "Activity" },
		text: { type: String },
	},
	schemaConfig,
);
export const ActivityComment = model<IactivitytComment>(
	"ActivityComment",
	activityCommentSchema,
);
