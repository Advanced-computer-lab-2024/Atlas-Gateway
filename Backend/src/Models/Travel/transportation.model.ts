import { Document, Schema, Types, model } from "mongoose";



import { schemaConfig } from "../../Config/schemaConfig";


export interface ITransportation extends Document {
	name: string;
	type: string;
	price: number;
	availability: number;
	pickUpLocation: string;
	dropOffLocation: string;
	timeTakenInMins: number;
	pickUpTime: Date;
	dropOffTime: Date;
	numberOfBookings: number;
	tourists: Types.ObjectId[];
	createdBy: Types.ObjectId;
}

const transportationSchema = new Schema<ITransportation>(
	{
		name: { type: String, required: true },
		type: {
			type: String,
			enum: ["Bus", "Car", "Train", "Plane", "Boat"],
			required: true,
		},
		price: { type: Number, required: true },
		availability: { type: Number, required: true },
		pickUpLocation: { type: String, required: true },
		dropOffLocation: { type: String, required: true },
		pickUpTime: { type: Date, required: true },
		dropOffTime: { type: Date, required: true },
		timeTakenInMins: { type: Number, required: true },
		numberOfBookings: { type: Number, default: 0 },
		tourists: [{ type: Schema.Types.ObjectId, ref: "Tourist" }],
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "Transportation Advertiser",
		},
	},
	schemaConfig,
);

export const Transportation = model<ITransportation>(
	"Transportation",
	transportationSchema,
);