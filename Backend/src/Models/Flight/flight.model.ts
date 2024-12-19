import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface IFlight extends Document {
	ticketType: "one-way" | "round-trip";
	departure: {
		departureTime: Date;
		arrivalTime: Date;
		duration: string;
		from: string;
		to: string;
		airLine: string;
		flightNumber: string;
	};
	returnTrip?: {
		departureTime: Date;
		arrivalTime: Date;
		duration: string;
		from: string;
		to: string;
		airLine: string;
		flightNumber: string;
	};
	// segments: {
	// 	leg: number;
	// 	departureTime: Date;
	// 	arrivalTime: Date;
	// 	from: string;
	// 	to: string;
	// }[];
	price: number;
	travelClass: string;
	bookedTickets: number;
	touristID: Types.ObjectId;
}

const FlightSchema = new Schema<IFlight>(
	{
		ticketType: {
			type: String,
			enum: ["one-way", "round-trip"],
			required: true,
		},
		departure: {
			// location: { type: String, required: true },
			departureTime: { type: Date, required: true },
			arrivalTime: { type: Date, required: true },
			duration: { type: String, required: true },
			from: { type: String, required: true },
			to: { type: String, required: true },
			airLine: { type: String, required: true },
			flightNumber: { type: String, required: true },
		},
		returnTrip: {
			departureTime: { type: Date },
			arrivalTime: { type: Date },
			duration: { type: String },
			from: { type: String },
			to: { type: String },
			airLine: { type: String },
			flightNumber: { type: String },
		},
		// segments: [
		// 	{
		// 		leg: { type: Number, required: true },
		// 		departureTime: { type: Date, required: true },
		// 		arrivalTime: { type: Date, required: true },
		// 		from: { type: String, required: true },
		// 		to: { type: String, required: true },
		// 	},
		// ],
		price: { type: Number, required: true },
		travelClass: { type: String, required: true },
		bookedTickets: { type: Number, required: true },
		touristID: {
			type: Schema.Types.ObjectId,
			// required: true,
			ref: "Tourist",
		},
	},
	schemaConfig,
);

export const Flight = model<IFlight>("Flight", FlightSchema);
