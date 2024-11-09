import { schemaConfig } from "@/Config/schemaConfig";
import { Express } from "express";
import { Document, Schema, Types, model } from "mongoose";

export interface IReview extends Document {
	rating: number;
	text: string;

	tourist: Types.ObjectId;
	reviewedItem: Types.ObjectId;
	itemType: string;
}

const reviewSchema = new Schema<IReview>(
	{
		rating: { type: Number, required: true, min: 0, max: 5 },
		text: { type: String, required: false },
		tourist: {
			type: Schema.Types.ObjectId,
			ref: "Tourist",
			required: true,
		},
		reviewedItem: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		itemType: { type: String, required: true },
	},
	schemaConfig,
);

export const Review = model<IReview>("Review", reviewSchema);
