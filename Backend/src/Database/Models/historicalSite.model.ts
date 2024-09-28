import { Document, Schema, Types, model } from "mongoose";

interface IMuseum extends Document {
  governorId: Types.ObjectId;
  name: string;
  location: string;
  description: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const museumSchema = new Schema<IMuseum>({
  governorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Museum = model<IMuseum>('Museum', museumSchema);
