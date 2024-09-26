import { Schema, model, Document, Types } from 'mongoose';

interface IProduct extends Document {
  sellerId: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  availability: 'in stock' | 'out of stock';
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: String, required: true, enum: ['in stock', 'out of stock'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Product = model<IProduct>('Product', productSchema);
