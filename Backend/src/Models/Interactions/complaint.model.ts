import { Document, ObjectId, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

interface IComplaint extends Document {
	title: string;
	// type: string;
	body: string;
	date: Date;
	state: string;
	reply: string;
	replyedBy: Types.ObjectId;
	createdBy: Types.ObjectId;
}

const complaintSchema = new Schema<IComplaint>(
	{
		title: { type: String, required: true },
		body: { type: String },
		// type: { type: String, enum: ["activities", "locations", "both"], default: "activities"},
		date: { type: Date, required: true },
		state: {
			type: String,
			enum: ["pending", "resolved"],
			default: "pending",
		},
		reply: { type: String },
		replyedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
		createdBy: { type: Schema.Types.ObjectId, ref: "Tourist" },
	},
	schemaConfig,
);

export const complaint = model<IComplaint>("complaint", complaintSchema);
