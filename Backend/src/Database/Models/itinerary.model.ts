import { schemaConfig } from "#utils";
import { Document, Schema, Types, model } from "mongoose";
import { Stream } from "stream";

interface IItinerary extends Document {
	title:string;
	language: string;
	price: number;
	availability: number;
	pickUpLocation: string;
	dropOffLocation: string;
	startDate: Date;
	startTime: string;
	endDate: Date;
	activities: [
		{
			activity?: Types.ObjectId;
			title: string;
			dateTime: Date;
			durationM: number;
		},
	];
	tags: Types.ObjectId[];
	createdBy: Types.ObjectId;
	numberOfBookings: number;
	reviews:{
		userId:Types.ObjectId;
		review:string;
		rating:number;
	},
	avgRating:number;
	totalNumberOfRatings: number;
}

const itinerarySchema = new Schema<IItinerary>(
	{	title:{type: String, required: true},
		language: { type: String, required: true },
		price: { type: Number, required: true },
		availability: { type: Number, required: true },
		pickUpLocation: { type: String, required: true },
		dropOffLocation: { type: String, required: true },
		startDate: { type: Date, required: true },
		startTime: { type: String, required: true },
		endDate: { type: Date, required: true },
		activities: [
			{
				id: { type: Schema.Types.ObjectId, required: false },
				title: { type: String, required: true },
				dateTime: { type: Date, required: true },
				durationM: { type: Number, required: true },
			},
		],
		tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
		createdBy: { type: Schema.Types.ObjectId, ref: "TourGuide" },
		numberOfBookings: { type: Number, default: 0 },
		reviews:{
			userId:{ type: Schema.Types.ObjectId, required: false },
			review:{type: String, required: false},
			rating:{type:Number, min:0,max:5},
		},
		avgRating:{type:Number, min:0,max:5, default: 0},
		totalNumberOfRatings: {type:Number, default: 0},
	},
	schemaConfig,
);

export const Itinerary = model<IItinerary>("Itinerary", itinerarySchema);
