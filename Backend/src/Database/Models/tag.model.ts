import { Document, Schema, Types, model } from "mongoose";

interface ITag extends Document {
  name: string;
  description: string;
  type: 'preference' | 'location';
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const tagSchema = new Schema<ITag>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true, enum: ['preference', 'location'] },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Tag = model<ITag>('Tag', tagSchema);
