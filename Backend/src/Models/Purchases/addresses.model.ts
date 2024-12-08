//One document is goint to hold all the addresses of a user
import { Schema, model, Document } from 'mongoose';

import { schemaConfig } from '../../Config/schemaConfig';

export interface IAddressStructure {
    country: string;
    city: string;
    street: string;
    houseNumber?: string; //Hours Number or building number
    apartmentNumber?: string; //Apartment number, if any
    zipCode: string;

}

const addressStructureSchema = new Schema<IAddressStructure>({
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: String },
    apartmentNumber: { type: String },
    zipCode: { type: String, required: true },
}, schemaConfig);

////////////////////////////////////////

export interface IAddress extends Document {
    touristId: Schema.Types.ObjectId;
    addresses: IAddressStructure[];
}

const addressSchema = new Schema<IAddress>({
    touristId: {
        type: Schema.Types.ObjectId,
        ref: "Tourist",
        required: true,
    },
    addresses: {
        type: [addressStructureSchema],
        required: true,
    },
}, schemaConfig);

export const Address = model<IAddress>("Address", addressSchema);