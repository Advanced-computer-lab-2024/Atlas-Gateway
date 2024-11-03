import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

interface ITransportation extends Document {
	type: string;
	price: number;
	availability: number;
	pickUpLocation: string;
	dropOffLocation: string;
    dateTime: Date;
    timeTaken: number;
    numberOfBookings: number;
	tourists: [
		{
			touristId: Types.ObjectId;
			name: string;
            mobile: string;
            currency?: string;
			walletBalance: number;
		},
	];
	createdBy: Types.ObjectId;
}

const transportationSchema = new Schema<ITransportation>(
	{
		type: { type: String, required: true },
		price: { type: Number, required: true },
		availability: { type: Number, required: true },
		pickUpLocation: { type: String, required: true },
		dropOffLocation: { type: String, required: true },
        dateTime: { type: Date, required: true },
        timeTaken: { type: Number, required: true },
        numberOfBookings: { type: Number, required: true },
		tourists: [
			{
				touristId: { type: Schema.Types.ObjectId, ref: "Tourist" },
				name: { type: String, required: true },
                mobile: { type: String, required: true },
                currency: { type: String, required: true },
				walletBalance: { type: Number, required: true },
			},
		],
		createdBy: { type: Schema.Types.ObjectId, ref: "Advertiser" },
	},
	schemaConfig,
);

export const Transportation = model<ITransportation>("Transportation", transportationSchema);
