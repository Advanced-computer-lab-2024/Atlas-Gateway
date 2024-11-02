import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface IActivity extends Document {
	name: string;
	description: string;
	dateTime: Date;
	location: string;
	tags: [Types.ObjectId];
	createdBy: Types.ObjectId;
	categories: [Types.ObjectId];
	minPrice: number;
	maxPrice: number;
	specialDiscounts: number;
	isOpen: boolean;
	reviews: {
		userId: Types.ObjectId;
		review: string;
		rating: number;
	};
	avgRating: number;
	totalNumberOfRatings: number;
}

const activitySchema = new Schema<IActivity>(
	{
		name: { type: String, required: true },
		description: { type: String },
		dateTime: { type: Date, required: true },
		location: { type: String, required: true },
		tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
		createdBy: { type: Schema.Types.ObjectId, ref: "Advertiser" },
		categories: [
			{
				type: Schema.Types.ObjectId,
				ref: "Category",
				required: true,
			},
		],
		minPrice: { type: Number, required: true, min: 0 },
		maxPrice: {
			type: Number,
			required: true,
			min: 0,
			validate: {
				validator: function (value) {
					return value >= this.minPrice;
				},
				message: "Max price can't be smaller than min price",
			},
		},
		specialDiscounts: { type: Number, required: true, min: 0, max: 100 },
		isOpen: { type: Boolean, required: true },
		reviews: {
			userId: { type: Schema.Types.ObjectId, required: false },
			review: { type: String, required: false },
			rating: { type: Number, min: 0, max: 5 },
		},
		avgRating: { type: Number, min: 0, max: 5, default: 0 },
		totalNumberOfRatings: { type: Number, default: 0 },
	},
	schemaConfig,
);

export const Activity = model<IActivity>("Activity", activitySchema);
