import { Document, ObjectId, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface ITag extends Document {
	name: string;
	//description: string;
	type: string;
	//createdBy: ObjectId;
}

const tagSchema = new Schema<ITag>(
	{
		name: { type: String, required: true },
		//description: { type: String, required: true },
		type: { type: String, required: true },
		//createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Why is this needed?
	},
	schemaConfig,
);

export const Tag = model<ITag>("Tag", tagSchema);
