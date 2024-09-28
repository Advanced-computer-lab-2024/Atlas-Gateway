import { Schema, model, Document, Types } from 'mongoose';
import { schemaConfig } from 'src/utils';

interface IProduct extends Document {
	id: Types.ObjectId;
	sellerId: Types.ObjectId;
	name: string;
	description: string;
	price: number;
	picture: string;
	quantity: number;
	isArchived: boolean;
	sales: number;
	rating: number;
	review: string;
}

const productSchema = new Schema<IProduct>(
	{
		id: { type: Schema.Types.ObjectId, required: true },
		sellerId: { type: Schema.Types.ObjectId, required: true, ref: 'Seller' },
		name: { type: String, required: true },
		description: { type: String },
		price: { type: Number, required: true },
		picture: { type: String, required: true },
		quantity: { type: Number, required: true },
		isArchived: { type: Boolean },
		sales: { type: Number },
		rating: { type: Number },
		review: { type: String },
	},
	schemaConfig
);

export const Product = model<IProduct>('Product', productSchema);
