import { Document, Schema, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface ICategory extends Document {
	name: string;
}

const categorySchema = new Schema<ICategory>(
	{
		name: { type: String, required: true },
	},
	schemaConfig,
);

export const Category = model<ICategory>("Category", categorySchema);
