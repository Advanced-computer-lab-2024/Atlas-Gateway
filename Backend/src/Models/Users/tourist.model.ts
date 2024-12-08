import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";
import { IFlight } from "../Flight/flight.model";
import { IHotelBooking } from "../Hotel/hotel.model";
import { IProduct } from "../Purchases/product.model";
import { IActivity } from "../Travel/activity.model";
import { IItinerary } from "../Travel/itinerary.model";
import { ITag } from "../Travel/tag.model";
import { ITransportation } from "../Travel/transportation.model";

export interface ITourist extends Document {
	name: string;
	username: string;
	email: string;
	password: string;
	walletBalance: number;
	mobile: string;
	nationality: string;
	dob: Date;
	occupation: string;
	address?: string[];
	currency?: string;
	loyaltyPoints: number;
	maxCollectedLoyaltyPoints: number;
	level: number;
	profile?: {
		bio?: string;
		location?: string;
		image?: string;
	};
	bookedItineraries: Types.ObjectId[];
	bookmarkedItineraries: Types.ObjectId[];

	bookedActivities: Types.ObjectId[];
	bookmarkedActivities: Types.ObjectId[];

	bookedTransportations: Types.ObjectId[] | ITransportation[];
	bookedFlights: Types.ObjectId[] | IFlight[];
	bookedHotelOffers: Types.ObjectId[];
	canceledItineraries: Types.ObjectId[];
	canceledActivities: Types.ObjectId[];

	purchaseProducts: Types.ObjectId[];
	wishlistproducts: Types.ObjectId[];
	isDeleted?: boolean;
	preferredTags?: Types.ObjectId[] | ITag[];
	cart: {
		product: Types.ObjectId;
		quantity: number;
	}[];
	payment: [
		{
			type: string;
			event: Types.ObjectId;
		},
	];
}

const touristSchema = new Schema<ITourist>(
	{
		name: { type: String },
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		walletBalance: { type: Number, required: true, default: 0 },
		mobile: { type: String, required: true },
		nationality: { type: String, required: true },
		dob: { type: Date, required: true },
		occupation: { type: String, required: true },
		address: [{ type: String }],
		currency: { type: String, default: "EGP" },
		loyaltyPoints: {
			type: Number,
			default: 0,
			validate: {
				validator: function (value) {
					if (value < 0) {
						this.loyaltyPoints = 0;
						return false;
					}
					return value >= 0;
				},
				message: "Loyalty Points can't be negative",
			},
		},
		maxCollectedLoyaltyPoints: {
			type: Number,
			default: 0,
			validate: {
				validator: function (value) {
					if (value < 0) {
						this.maxCollectedLoyaltyPoints = 0;
						return false;
					}
					return value >= this.loyaltyPoints;
				},
				message:
					"Max Collected Loyalty Points can't be negative or smaller than Loyalty Points",
			},
		},
		level: { type: Number, enum: [1, 2, 3], default: 1 },
		profile: {
			bio: { type: String },
			location: { type: String },
			image: { type: String },
		},
		bookedItineraries: [{ type: Schema.Types.ObjectId, ref: "Itinerary" }],
		bookmarkedItineraries: [
			{ type: Schema.Types.ObjectId, ref: "Itinerary" },
		],

		bookedActivities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
		bookmarkedActivities: [
			{ type: Schema.Types.ObjectId, ref: "Activity" },
		],

		bookedTransportations: [
			{ type: Schema.Types.ObjectId, ref: "Transportation" },
		],
		bookedFlights: [{ type: Schema.Types.ObjectId, ref: "Flight" }],
		// canceledItineraries: [
		// 	{ type: Schema.Types.ObjectId, ref: "Itinerary" },
		// ],
		// canceledActivities: [{ types: Schema.Types.ObjectId, ref: "Activity" }],

		purchaseProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
		wishlistproducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],

		bookedHotelOffers: [
			{ type: Schema.Types.ObjectId, ref: "HotelBooking" },
		],
		isDeleted: { type: Boolean, default: false },
		preferredTags: [
			{ type: Schema.Types.ObjectId, ref: "Tag", required: true },
		],
		payment: [
			{
				type: { type: String },
				event: { type: Schema.Types.ObjectId },
			},
		],
		cart: [
			{
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				quantity: { type: Number, required: true },
			},
		],
	},
	schemaConfig,
);

export const Tourist = model<ITourist>("Tourist", touristSchema);
