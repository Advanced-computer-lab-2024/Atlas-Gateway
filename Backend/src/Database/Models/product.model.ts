import { Schema, model, Document, Types } from "mongoose";
import { schemaConfig } from "./schemaConfig";

interface IProduct extends Document {
  sellerId: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  availability: number;
  rating: number;
}

const productSchema = new Schema<IProduct>(
  {
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0 },
  },
  schemaConfig
);

export const Product = model<IProduct>("Product", productSchema);
