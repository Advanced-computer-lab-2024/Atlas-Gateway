import { Document, Schema, Types, model } from "mongoose";

import { schemaConfig } from "../../Config/schemaConfig";

export interface IHotelBooking extends Document {
	hotel: {
		hotelId: string;
		chainCode: string;
		name: string;
		cityCode: string;
	};
	offer: {
		id: string;
		checkInDate: string;
		checkOutDate: string;
		rateCode: string;
		rateFamilyEstimated: {
			code: string;
			type: string;
		};
		room: {
			type: string;
			typeEstimated: {
				beds: number;
				bedType: string;
			};
			description: {
				text: string;
				lang: string;
			};
		};
		guests: {
			adults: number;
		};
		price: {
			currency: string;
			base: string;
			total: string;
			variations: {
				average: {
					base: string;
				};
				changes: [
					{
						startDate: string;
						endDate: string;
						base: string;
					},
				];
			};
		};
		policies: {
			cancellations: [
				{
					deadline: string;
					amount: string;
				},
			];
			paymentType: string;
		};
		self: string;
	};
}

const HotelBookingSchema = new Schema<IHotelBooking>(
	{
		hotel: {
			hotelId: { type: String, required: false },
			chainCode: { type: String, required: false },
			name: { type: String, required: false },
			cityCode: { type: String, required: false },
		},
		offer: {
			checkInDate: { type: String, required: false },
			checkOutDate: { type: String, required: false },
			room: {
				type: { type: String, required: false },
				typeEstimated: {
					beds: { type: Number, required: false },
					bedType: { type: String, required: false },
				},
				description: {
					text: { type: String, required: false },
					lang: { type: String, required: false },
				},
			},
			guests: {
				adults: { type: Number, required: false },
			},
			price: {
				currency: { type: String, required: false },
				base: { type: String, required: false },
				total: { type: String, required: false },
			},
		},
	},
	schemaConfig,
);

export const HotelBooking = model<IHotelBooking>(
	"HotelBooking",
	HotelBookingSchema,
);
