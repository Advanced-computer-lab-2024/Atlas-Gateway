import { schemaConfig } from "#utils";
import { Document, Schema, Types, model } from "mongoose";

interface IPlaces extends Document {
	//description, pictures, location, opening hours, ticket prices
	governorId: Types.ObjectId;
	name: string;
	location: string;
	pictures: string;
	openingHours: {
		sunday: {
			open:string;
			close:string;
			dayOff:boolean
		};
		monday: {
			open:string;
			close:string;
			dayOff:boolean
		};
		tuesday: {
			open:string;
			close:string;
			dayOff:boolean
		};
		wednesday: {
			open:string;
			close:string;
			dayOff:boolean
		};
		thursday: {
			open:string;
			close:string;
			dayOff:boolean
		};
		friday: {
			open:string;
			close:string;
			dayOff:boolean
		};
		saturday: {
			open:string;
			close:string;
			dayOff:boolean
		};
	};
	description: string;
	ticketPrices: Number[];
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
		pictures: { type: String, required: true },
		openingHours: {
			sunday: { 
				open: { type: String},
				close:{ type: String},
				dayOff:{ type: Boolean}
			},
			monday: { 
				open: { type: String},
				close:{ type: String},
				dayOff:{ type: Boolean}
			},
			tuesday:{ 
				open: { type: String},
				close:{ type: String},
				dayOff:{ type: Boolean}
			},
			wednesday: { 
				open: { type: String},
				close:{ type: String},
				dayOff:{ type: Boolean}
			},
			thursday:{ 
				open: { type: String},
				close:{ type: String},
				dayOff:{ type: Boolean}
			},
			friday: { 
				open: { type: String},
				close:{ type: String},
				dayOff:{ type: Boolean}
			},
			saturday: { 
				open: { type: String},
				close:{ type: String},
				dayOff:{ type: Boolean}
			},
		},
		ticketPrices: [{ type: Number, required: true }],
		tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
	},
	schemaConfig,
);

export const Places = model<IPlaces>("Places", placesSchema);
