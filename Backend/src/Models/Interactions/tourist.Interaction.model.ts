import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface ITouristInteraction extends Document {
	touristID: Types.ObjectId;
	tourGuideID: Types.ObjectId;
	tourGuide_rating: number;
	tourGuide_comment: string;
}

const touristInteractionScehma = new Schema<ITouristInteraction>(
	{
		touristID: { type: Schema.ObjectId, ref: "Tourist" },
		tourGuideID: { type: Schema.ObjectId, ref: "TourGuide" },
		tourGuide_rating: { type: Number },
		tourGuide_comment: { type: String },
	},
	schemaConfig,
);

export const TouristInteraction = model<ITouristInteraction>(
	"TouristInteractions",
	touristInteractionScehma,
);
