import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface IAdmin extends Document {
	username: string;
	email: string; // story 3
	password: string;
	notifications: Types.ObjectId[];
}

const adminSchema = new Schema<IAdmin>(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
	},
	schemaConfig,
);

export const Admin = model<IAdmin>("Admin", adminSchema);
