import { Document, Schema, Types, model } from "mongoose";
import { schemaConfig } from "../../Config/schemaConfig";
import { IProduct, productSchema } from "./product.model";

export enum EOrderStatus {
    PROCESSING = "Pending",
    DELIVERY = "Out for Delivery",
    CANCELLED = "Cancelled",
    COMPLETED = "Completed",
}

export enum EPaymentMethod {
    CARD = "Card",
    CASH = "Cash",
    WALLET = "Wallet",
}

interface IProductTuple {
    productId: Types.ObjectId;
    product: IProduct;
}

const productTupleSchema = new Schema<IProductTuple>(

    {
        productId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        product: {
            type: productSchema,
            required: true,
        },
    },
    schemaConfig,

);
export interface IOrder extends Document {
    touristId: Types.ObjectId;
    products: IProductTuple[];
    totalPrice: number;
    status: EOrderStatus;
    date: Date;
    address: string;
    paymentMethod: string;
}

const orderSchema = new Schema<IOrder>(
	{
        touristId: {
            type: Schema.Types.ObjectId,
            ref: "Tourist",
            required: true,
        },
        products: {
            type: [productSchema],
            ref: "Product",
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(EOrderStatus),
            default: EOrderStatus.PROCESSING,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        address: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: Object.values(EPaymentMethod),
            required: true,
        },
	},
	schemaConfig,
);



export const Order = model<IOrder>("Order", orderSchema);
