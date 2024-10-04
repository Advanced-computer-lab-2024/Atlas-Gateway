import { schemaConfig } from "#utils";
import { Document, Schema, Types, model } from "mongoose";

export interface ITourist extends Document {
	id: Types.ObjectId;
	username: string;
	email: string; // story 3
	password: string;
	wallet: number; // story 11
	address: string; //  story 98 99
	currency: string; // story 51
	loyaltyPoints: number; // story 70
	isDeleted: boolean;
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
		address: { type: String, required: true },
		currency: { type: String, required: true },
		loyaltyPoints: { type: Number, required: true },
		isDeleted: { type: Boolean },
		profile: {
			bio: { type: String },
			location: { type: String },
			image: { type: String },
		},
	},
	schemaConfig,
);

export const Tourist = model<ITourist>("User", touristSchema);
