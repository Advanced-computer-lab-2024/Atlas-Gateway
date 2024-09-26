import { Document, Schema, Types, model } from "mongoose";

export interface IActivity extends Document {
  name: string;
  description: string;
  category: string;
  createdBy: Types.ObjectId;
  // status: 'active' | 'inactive' | 'deleted';
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
  // status: { type: String, required: true, enum: ['active', 'inactive', 'deleted'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Activity = model<IActivity>('Activity', activitySchema);
