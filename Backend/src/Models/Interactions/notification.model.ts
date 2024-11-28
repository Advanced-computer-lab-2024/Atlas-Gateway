import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface INotification extends Document {
	type: string;
	message: string;
    notifiedTo: Types.ObjectId;
    userType: string;
    read: boolean;
	createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
	{
        type: { type: String, enum: ['reminder', 'info', 'warning', 'error'], required: true },
        message: { type: String, required: true },
        notifiedTo: { type: Schema.Types.ObjectId, refPath: 'userType', required: true },
        userType: { type: String, enum: ['Admin', 'Tourist', 'Advertiser', 'Seller', 'TourGuide'], required: true },
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
	},
	schemaConfig,
);

export const Notification = model<INotification>("notification", notificationSchema);
