import { Document, Types, Schema, model } from "mongoose";
import { schemaConfig } from "src/utils";



export interface ITourGuide extends Document {
    id : Types.ObjectId;
    userName: string; 
    email: string; // story 3
    password: string;
    description: string;
    picture: string;
    experience: string;
    previous: {
        title: string,
        description: string,
        company: string,
        start: Date,
        end: Date 
    };
    isDeleted: boolean;
    itinerary: [Types.ObjectId];
}

const tourGuideSchema = new Schema<ITourGuide>({
    id: { type: Schema.Types.ObjectId, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    description: { type: String },
    isDeleted: { type: Boolean },
    picture: { type: String },
    experience: { type: String },
    previous: {
        title: { type: String },
        description: { type: String },
        company: { type: String },
        start: { type: Date },
        end: { type: Date }
    },
    itinerary: [{ type: Schema.Types.ObjectId, ref: 'Itinerary' }],
    
}, schemaConfig);

export const TourGuide = model<ITourGuide>('TourGuide', tourGuideSchema);