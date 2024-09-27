import { Document, Schema, model } from "mongoose";

export interface IActivity extends Document {
  description: string;
  dateTime: Date;
  location: string;
  tags: string; // could be modified later based on a question (2 and 3)
  category: string; // will be modified later based on the schema of activity category
  minPrice: number;
  maxPrice: number;
  specialDiscounts: number;
  isOpen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    description: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true },
    tags: { type: String, required: true },
    category: { type: String, required: true },
    minPrice: { type: Number, required: true, min: 0 }, // more validation to be done for example minPrice > maxPrice
    maxPrice: { type: Number, required: true, min: 0 },
    specialDiscounts: { type: Number, required: true, min: 0, max: 100 },
    isOpen: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
export const Activity = model<IActivity>("Activity", activitySchema);
