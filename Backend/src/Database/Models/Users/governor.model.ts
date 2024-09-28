import { Document, Types, Schema, model } from "mongoose";


export interface IGovernor extends Document {
    id : Types.ObjectId;
    userName: string; 
    email: string; // story 3
    password: string;
    isDeleted: boolean;
    historicalLocations: [Types.ObjectId];
}

const governorSchema = new Schema<IGovernor>({
    id: { type: Schema.Types.ObjectId, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean },
    historicalLocations: [{ type: Schema.Types.ObjectId, ref: 'HistoricalLocation' }],
}, { timestamps: true });

export const Governor = model<IGovernor>('Governor', governorSchema);