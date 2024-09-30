import { schemaConfig } from "#utils";
import { Document, Schema, Types, model } from "mongoose";

export interface IGovernor extends Document {
	userName: string;
	email: string; // story 3
	password: string;
	historicalLocations: [Types.ObjectId];
}

const governorSchema = new Schema<IGovernor>(
	{
		userName: { type: String, required: true, unique: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
	},
	schemaConfig,
);

export const Governor = model<IGovernor>("Governor", governorSchema);
