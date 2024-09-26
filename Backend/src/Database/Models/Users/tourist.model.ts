import { Schema, model, Document } from 'mongoose';

interface ITourist extends Document {
  name: string;
  email: string;
  passwordHash: string;
  profile?: {
    bio?: string;
    location?: string;
    image?: string;
  };
  status: 'active' | 'inactive' | 'deleted';
  createdAt: Date;
  updatedAt: Date;
}

const touristSchema = new Schema<ITourist>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  profile: {
    bio: { type: String },
    location: { type: String },
    image: { type: String }
  },
  status: { type: String, required: true, enum: ['active', 'inactive', 'deleted'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Tourist = model<ITourist>('User', touristSchema);