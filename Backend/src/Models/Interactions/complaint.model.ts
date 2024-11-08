import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

interface IComplaint extends Document {
	title: string;
	body: string;
	status: string;
	reply: string;
	date: Date;
	replyedBy: Types.ObjectId;
	createdBy: Types.ObjectId;
}

const complaintSchema = new Schema<IComplaint>(
	{
		title: { type: String, required: true },
		body: { type: String },
		status: {
			type: String,
			enum: ["pending", "resolved"],
			default: "pending",
		},
		reply: { type: String },
		date: { type: Date, default: Date.now },
		replyedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
		createdBy: { type: Schema.Types.ObjectId, ref: "Tourist" },
	},
	schemaConfig,
);

export const Complaint = model<IComplaint>("complaint", complaintSchema);
