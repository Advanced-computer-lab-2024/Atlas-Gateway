import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface IGovernor extends Document {
	username: string;
	email: string;
	password: string;
	places: [Types.ObjectId];
}

const governorSchema = new Schema<IGovernor>(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		places: [{ type: Schema.Types.ObjectId, ref: "Places" }],
	},
	schemaConfig,
);

export const Governor = model<IGovernor>("Governor", governorSchema);