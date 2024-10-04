import { schemaConfig } from "#utils";
import { Document, Schema, model } from "mongoose";

export interface IAdmin extends Document {
	username: string;
	email: string; // story 3
	password: string;
}

const adminSchema = new Schema<IAdmin>(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
	},
	schemaConfig,
);

export const Admin = model<IAdmin>("Admin", adminSchema);
