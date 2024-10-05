import { schemaConfig } from "#utils";
import { Document, Schema, Types, model } from "mongoose";

interface IPlaces extends Document {
	//description, pictures, location, opening hours, ticket prices
	governorId: Types.ObjectId;
	name: string;
	location: string;
	pictures:string;
	openingHours:{
		sunday:string,
		monday:string,
		tuesday:string,
		wednesday:string,
		thursday:string,
		friday:string,
		saturday:string
	};
	description: string;
	ticketPrices:Number[];
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
}

const placesSchema = new Schema<IPlaces>(
	{
		governorId: {
			type: Schema.Types.ObjectId,
			ref: "governer",
			required: true,
		},
		name: { type: String, required: true },
		location: { type: String, required: true },
		description: { type: String, required: true },
		pictures:{ type: String, required: true },
		openingHours:{
			sunday:{ type: String, required: true },
			monday:{ type: String, required: true },
			tuesday:{ type: String, required: true },
			wednesday:{ type: String, required: true },
			thursday:{ type: String, required: true },
			friday:{ type: String, required: true },
			saturday:{ type: String, required: true }
		},
		ticketPrices: [{ type: Number, required: true }],
		tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
	},
	schemaConfig,
);

export const Places = model<IPlaces>("Places", placesSchema);
