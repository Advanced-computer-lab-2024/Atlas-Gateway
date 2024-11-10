import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface IFlight extends Document {
	ticketType: "one-way" | "return";
	departure: {
		dateTime: Date;
		location: string;
		airline: string;
		flightNumber: string;
	};
	returnTrip?: {
		dateTime: Date;
		location: string;
		airline: string;
		flightNumber: string;
	};
	segments: {
		leg: number;
		departureTime: Date;
		arrivalTime: Date;
		from: string;
		to: string;
	}[];
	price: number;
	travelClass: string;
	bookedTickets: number;
	touristID: Types.ObjectId;
}

const FlightSchema = new Schema<IFlight>(
	{
		ticketType: {
			type: String,
			enum: ["one-way", "return"],
			required: true,
		},
		departure: {
			dateTime: { type: Date, required: true },
			location: { type: String, required: true },
			airline: { type: String, required: true },
			flightNumber: { type: String, required: true },
		},
		returnTrip: {
			dateTime: { type: Date },
			location: { type: String },
			airline: { type: String },
			flightNumber: { type: String },
		},
		segments: [
			{
				leg: { type: Number, required: true },
				departureTime: { type: Date, required: true },
				arrivalTime: { type: Date, required: true },
				from: { type: String, required: true },
				to: { type: String, required: true },
			},
		],
		price: { type: Number, required: true },
		travelClass: { type: String, required: true },
		bookedTickets: { type: Number, required: true },
		touristID: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Tourist",
		},
	},
	schemaConfig,
);

export const Flight = model<IFlight>("Flight", FlightSchema);
