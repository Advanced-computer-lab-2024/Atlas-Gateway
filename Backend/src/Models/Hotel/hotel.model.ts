import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface IHotelBooking extends Document {
	touristID: Types.ObjectId;
	hotel: {
		type: string;
		hotelId: string;
		chainCode: string;
		name: string;
		cityCode: string;
		latitude: number;
		longitude: number;
	};
	offer: {
		checkInDate: string;
		checkOutDate: string;
		room: {
			type: string;
			typeEstimated: {
				category: string;
				beds: number;
				bedType: string;
			};
			description: {
				text: string;
				lang: string;
			};
		};
		guests: number;
		price: {
			currency: string;
			base: string;
			total: string;
		};
		policies: {
			cancellations: {
				description: {
					text: string;
				};
				type: string;
			}[];
			paymentType: string;
		};
	}[];
}

const HotelBookingSchema = new Schema<IHotelBooking>(
	{
		touristID: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Tourist",
		},
		hotel: {
			type: { type: String, required: true },
			hotelId: { type: String, required: true },
			chainCode: { type: String, required: true },
			name: { type: String, required: true },
			cityCode: { type: String, required: true },
			latitude: { type: Number, required: true },
			longitude: { type: Number, required: true },
		},
		offer: [
			{
				checkInDate: { type: String, required: true },
				checkOutDate: { type: String, required: true },
				room: {
					type: { type: String, required: true },
					typeEstimated: {
						category: { type: String, required: true },
						beds: { type: Number, required: true },
						bedType: { type: String, required: true },
					},
					description: {
						text: { type: String, required: true },
						lang: { type: String, required: true },
					},
				},
				guests: { type: Number, required: true },
				price: {
					currency: { type: String, required: true },
					base: { type: String, required: true },
					total: { type: String, required: true },
				},
				policies: {
					cancellations: [
						{
							description: {
								text: { type: String, required: true },
							},
							type: { type: String, required: true },
						},
					],
					paymentType: { type: String, required: true },
				},
			},
		],
	},
	schemaConfig,
);

export const HotelBooking = model<IHotelBooking>(
	"HotelBooking",
	HotelBookingSchema,
);
