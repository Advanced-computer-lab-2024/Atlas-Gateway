import { Document, Schema, Types, model } from "mongoose";



import { schemaConfig } from "../../Config/schemaConfig";
import { ITourist } from "../Users/tourist.model";
import { ICategory } from "./category.model";
import { ITag } from "./tag.model";


export interface IActivity extends Document {
	name: string;
	description: string;
	dateTime: Date;
	location: string;
	tags: Types.ObjectId[] | ITag[];
	createdBy: Types.ObjectId;
	categories: Types.ObjectId[] | ICategory[];
	minPrice: number;
	maxPrice: number;
	specialDiscounts: number;
	isOpen: boolean;
	avgRating: number;
	totalNumberOfRatings: number;
	numberOfBookings: number;
	tourists: Types.ObjectId[] | ITourist[];
	touristBookmarks: Types.ObjectId[];
	isDeleted?: boolean;
	isArchived?: boolean;
	notificationRequested: Types.ObjectId[];

	bookings?: Types.ObjectId[];
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
		avgRating: {
			type: Number,
			min: 0,
			max: 5,
			default: 0,
			validate: {
				validator: function (value) {
					return value >= 0 && value <= 5;
				},
				message: "Rating must be between 0 and 5",
			},
		},
		isArchived: { type: Boolean, default: false },
		isDeleted: { type: Boolean, default: false },
		totalNumberOfRatings: { type: Number, default: 0 },
		numberOfBookings: {
			type: Number,
			default: 0,
			validate: {
				validator: function (value) {
					return value >= 0;
				},
				message: "Number of bookings can't be negative",
			},
		},

		tourists: [{ type: Schema.Types.ObjectId, ref: "Tourist" }],
		notificationRequested: [
			{ type: Schema.Types.ObjectId, ref: "Tourist" },
		],

		bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
		touristBookmarks: [{ type: Schema.Types.ObjectId, ref: "Tourist" }],
	},
	schemaConfig,
);

export const Activity = model<IActivity>("Activity", activitySchema);