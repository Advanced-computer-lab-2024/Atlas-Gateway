import { schemaConfig } from "@utils";
import { Document, Types, Schema, model } from "mongoose";


export interface ISeller extends Document {
    id : Types.ObjectId;
    userName: string; 
    email: string; // story 3
    password: string;
    picture: string;
    description: string;
    isDeleted: boolean;
    products: [Types.ObjectId];
}

const sellerSchema = new Schema<ISeller>({
    id: { type: Schema.Types.ObjectId, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    picture: { type: String, required: true },
    description: { type: String },
    isDeleted: { type: Boolean },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
}, schemaConfig);

export const Seller = model<ISeller>('Seller', sellerSchema);