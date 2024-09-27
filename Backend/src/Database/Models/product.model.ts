import { Schema, model, Document, Types } from "mongoose";

interface IProduct extends Document {
  sellerId: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  availability: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  } // This will remove the __v field
);

export const Product = model<IProduct>("Product", productSchema);
