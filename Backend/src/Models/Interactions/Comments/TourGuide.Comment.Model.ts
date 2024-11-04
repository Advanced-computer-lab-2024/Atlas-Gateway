import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../../Config/schemaConfig";

export interface ItourGuideComments extends Document {
	touristId: Types.ObjectId;
	tourGuideId: Types.ObjectId;
	text: string;
}
const tourGuideCommentSchema = new Schema<ItourGuideComments>({
	touristId: { type: Schema.ObjectId, ref: "Tourist" },
	tourGuideId: { type: Schema.ObjectId, ref: "TourGuide" },
	text: { type: String },
});
export const TourGuideComment = model<ItourGuideComments>(
	"TourGuideComment",
	tourGuideCommentSchema,
);
