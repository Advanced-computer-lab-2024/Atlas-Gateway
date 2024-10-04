import { schemaConfig } from "#utils";
import { Document, Schema, Types, model } from "mongoose";

export interface ITourist extends Document {
	id: Types.ObjectId;
	username: string;
	email: string; // story 3
	password: string;
	wallet: number; // story 11
	mobileNumber: number;
	nationality: string;
	dob: Date;
	job: string;
	address?: string[]; //  story 98 99 Maro comment: Multiple addresses can be added
	currency?: string; // story 51
	loyaltyPoints?: number; // story 70
	profile?: {
		bio?: string;
		location?: string;
		image?: string;
	};
}

const touristSchema = new Schema<ITourist>(
	{
		id: { type: Schema.Types.ObjectId, required: true },
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		wallet: { type: Number, required: true },
		mobileNumber: { type: Number, required: true },
		nationality:{type: String, required: true},
		dob: { type: Date, required: true },
		job: { type: String, required: true },
		address: [{ type: String}],
		currency: { type: String},
		loyaltyPoints: { type: Number, required: true },
		profile: {
			bio: { type: String },
			location: { type: String },
			image: { type: String },
		},
	},
	schemaConfig,
);

export const Tourist = model<ITourist>("User", touristSchema);
