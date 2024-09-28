import { Document, Types, Schema, model } from 'mongoose';
import { schemaConfig } from '#utils';

export interface IAdvertiser extends Document {
	id: Types.ObjectId;
	userName: string;
	email: string; // story 3
	password: string;
	isDeleted: boolean;
	companyProfile: {
		hotline: number;
		address: string;
		website: string;
		logo: string;
		description: string;
	};
	activities: [Types.ObjectId];
}

const advertiserSchema = new Schema<IAdvertiser>(
	{
		id: { type: Schema.Types.ObjectId, required: true },
		userName: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		isDeleted: { type: Boolean },
		companyProfile: {
			hotline: { type: Number },
			address: { type: String },
			website: { type: String },
			logo: { type: String },
			description: { type: String },
		},
		activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
	},
	schemaConfig
);

export const Advertiser = model<IAdvertiser>('Advertiser', advertiserSchema);
