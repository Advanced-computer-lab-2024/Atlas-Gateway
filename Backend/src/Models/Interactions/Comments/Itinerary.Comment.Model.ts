import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../../Config/schemaConfig";

export interface IitineraryComments extends Document {
	touristId: Types.ObjectId;
	itineraryId: Types.ObjectId;
	text: string;
}
const itineraryCommentSchema = new Schema<IitineraryComments>(
	{
		touristId: { type: Schema.ObjectId, ref: "Tourist" },
		itineraryId: { type: Schema.ObjectId, ref: "Itinerary" },
		text: { type: String },
	},
	schemaConfig,
);
export const ItineraryComment = model<IitineraryComments>(
	"ItineraryComment",
	itineraryCommentSchema,
);
