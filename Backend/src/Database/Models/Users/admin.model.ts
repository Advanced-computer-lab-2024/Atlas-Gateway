import { Document, Types, Schema, model } from 'mongoose';
import { schemaConfig } from '#utils';

export interface IAdmin extends Document {
	id: Types.ObjectId;
	userName: string;
	email: string; // story 3
	password: string;
	isDeleted: boolean;
}

const adminSchema = new Schema<IAdmin>(
	{
		id: { type: Schema.Types.ObjectId, required: true },
		userName: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		isDeleted: { type: Boolean },
	},
	schemaConfig
);

export const Admin = model<IAdmin>('Admin', adminSchema);
