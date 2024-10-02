import { schemaConfig } from "#utils";
import { Document, Schema, model } from "mongoose";

export interface IActivity extends Document {
	description: string;
	dateTime: Date;
	location: string;
	tags: Schema.Types.ObjectId[];
	category: Schema.Types.ObjectId;
	minPrice: number;
	maxPrice: number;
	specialDiscounts: number;
	isOpen: boolean;
}

const activitySchema = new Schema<IActivity>(
	{
		description: { type: String, required: true },
		dateTime: { type: Date, required: true },
		location: { type: String, required: true },
		tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
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
	},
	schemaConfig,
);

export const Activity = model<IActivity>("Activity", activitySchema);
