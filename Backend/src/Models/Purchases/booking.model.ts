import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";
import { IActivity } from "../Travel/activity.model";
import { IItinerary } from "../Travel/itinerary.model";

export interface IBooking extends Document {
	touristId: Types.ObjectId;
	activityId?: Types.ObjectId | IActivity;
	itineraryId?: Types.ObjectId | IItinerary;
	totalPrice: number;
	isCancelled: boolean;
	isDeleted: boolean;
	createdAt: Date;
}

const bookingSchema = new Schema<IBooking>(
	{
		touristId: {
			type: Schema.Types.ObjectId,
			ref: "Tourist",
			required: true,
		},
		activityId: {
			type: Schema.Types.ObjectId,
			ref: "Activity",
		},
		itineraryId: {
			type: Schema.Types.ObjectId,
			ref: "Itinerary",
		},
		totalPrice: { type: Number, required: true },
		isCancelled: { type: Boolean, default: false },
		isDeleted: { type: Boolean, default: false },
	},
	schemaConfig,
);

bookingSchema.pre("validate", function (next) {
	if (!this.itineraryId && !this.activityId) {
		return next(
			new Error("Either itinerary or activity must be provided."),
		);
	}
	next();
});

export const Booking = model<IBooking>("Booking", bookingSchema);
