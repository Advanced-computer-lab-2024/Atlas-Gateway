import { Document, Schema, model, Types } from 'mongoose';
import { schemaConfig } from '@utils';

interface IItinerary extends Document {
	id: Types.ObjectId;
	language: string;
	price: number;
	availability: number;
	pickUpLocation: string;
	dropOffLocation: string;
	activities: Types.ObjectId[];
	tags: string[];
	createdBy: Types.ObjectId;
}

const itinerarySchema = new Schema<IItinerary>(
	{
		id: { type: Schema.Types.ObjectId, required: true },
		language: { type: String, required: true },
		price: { type: Number, required: true },
		availability: { type: Number, required: true },
		pickUpLocation: { type: String, required: true },
		dropOffLocation: { type: String, required: true },
		activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
		tags: [{ type: String }],
		createdBy: { type: Schema.Types.ObjectId, ref: 'TourGuide' },
	},
	schemaConfig
);

export const Itinerary = model<IItinerary>('Itinerary', itinerarySchema);
