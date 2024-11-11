import mongoose, { Types } from "mongoose";

import amadeus from "../../Config/amadeus.config";
import HttpError from "../../Errors/HttpError";
import { HotelBooking, IHotelBooking } from "../../Models/Hotel/hotel.model";

interface HotelSearchParams {
	cityCode: string;
	checkInDate: string;
	checkOutDate: string;
	adults: string;
	page: number;
}

export async function getHotelsByCity(cityCode: string) {
	try {
		const response =
			await amadeus.referenceData.locations.hotels.byCity.get({
				cityCode: cityCode,
			});
		return response.data;
	} catch (error) {
		console.error("Error in getHotelsByCity:", error);
		throw error;
	}
}
export async function searchHotelOffers(params: HotelSearchParams) {
	try {
		const hotels = await getHotelsByCity(params.cityCode);

		const hotelsPerPage = 5;
		const startIndex = (params.page - 1) * hotelsPerPage;
		const endIndex = startIndex + hotelsPerPage;
		if (startIndex >= hotels.length) {
			throw new HttpError(404, "No more hotels to show");
		}
		const paginatedHotels = hotels.slice(startIndex, endIndex);

		const hotelIds = paginatedHotels
			.map((hotel: any) => hotel.hotelId)
			.join(",");

		const searchParams: any = {
			hotelIds: hotelIds,
			checkInDate: params.checkInDate,
			checkOutDate: params.checkOutDate,
			adults: params.adults,
		};

		const response =
			await amadeus.shopping.hotelOffersSearch.get(searchParams);
		const data = response.data;
		const hotelBookingData = data.map((item: any) => ({
			hotel: {
				type: item.hotel.type,
				hotelId: item.hotel.hotelId,
				chainCode: item.hotel.chainCode,
				name: item.hotel.name,
				cityCode: item.hotel.cityCode,
				latitude: item.hotel.latitude,
				longitude: item.hotel.longitude,
			},
			offer: item.offers.map((offer: any) => ({
				checkInDate: offer.checkInDate,
				checkOutDate: offer.checkOutDate,
				room: {
					type: offer.room.type,
					typeEstimated: {
						category: offer.room.typeEstimated.category,
						beds: offer.room.typeEstimated.beds || 0,
						bedType: offer.room.typeEstimated.bedType || "Unknown",
					},
					description: {
						text: offer.room.description.text,
						lang: offer.room.description.lang,
					},
				},
				guests: offer.guests.adults,
				price: {
					currency: offer.price.currency,
					base: offer.price.base,
					total: offer.price.total,
				},
				policies: {
					cancellations: offer.policies.cancellations.map(
						(cancellation: any) => ({
							description: {
								text: cancellation.description.text,
							},
							type: cancellation.type,
						}),
					),
					paymentType: offer.policies.paymentType,
				},
			})),
		}));
		return hotelBookingData;
	} catch (error) {
		console.error("Error in searchHotelOffers:", error);
		throw error;
	}
}

export async function saveHotelOffer(data: any, userid: string) {
	try {
		if (!Types.ObjectId.isValid(userid)) {
			throw new HttpError(400, "Invalid Flight ID");
		}
		data.touristID = new Types.ObjectId(userid);
		// const hotelBookingData = {
		// 	touristID: new Types.ObjectId(userid), // Assuming you have a touristID to associate
		// 	hotel: {
		// 		type: data.hotel.type,
		// 		hotelId: data.hotel.hotelId,
		// 		chainCode: data.hotel.chainCode,
		// 		name: data.hotel.name,
		// 		cityCode: data.hotel.cityCode,
		// 		latitude: data.hotel.latitude,
		// 		longitude: data.hotel.longitude,
		// 	},
		// 	offer: data.offers.map((offer: any) => ({
		// 		checkInDate: offer.checkInDate,
		// 		checkOutDate: offer.checkOutDate,
		// 		room: {
		// 			type: offer.room.type,
		// 			typeEstimated: {
		// 				category: offer.room.typeEstimated.category,
		// 				beds: !offer.room.typeEstimated.beds
		// 					? 0
		// 					: offer.room.typeEstimated.beds,
		// 				bedType: !offer.room.typeEstimated.bedType
		// 					? "Unknown"
		// 					: offer.room.typeEstimated.bedType,
		// 			},
		// 			description: {
		// 				text: offer.room.description.text,
		// 				lang: offer.room.description.lang,
		// 			},
		// 		},
		// 		guests: offer.guests.adults,
		// 		price: {
		// 			currency: offer.price.currency,
		// 			base: offer.price.base,
		// 			total: offer.price.total,
		// 		},
		// 		policies: {
		// 			cancellations: offer.policies.cancellations.map(
		// 				(cancellation: any) => ({
		// 					description: {
		// 						text: cancellation.description.text,
		// 					},
		// 					type: cancellation.type,
		// 				}),
		// 			),
		// 			paymentType: offer.policies.paymentType,
		// 		},
		// 	})),
		// };

		const hotelBooking: IHotelBooking = new HotelBooking(data);
		const savedHotelBooking = await hotelBooking.save();
		return savedHotelBooking;
	} catch (error) {
		console.error("Error in saveHotelOffer:", error);
		throw error;
	}
}
export async function deleteHotelBooking(id: string, userid: any) {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Invalid Hotel ID");
	}
	if (!Types.ObjectId.isValid(userid)) {
		throw new HttpError(400, "Invalid User ID");
	}

	const session = await mongoose.startSession();
	try {
		session.startTransaction();

		// Find the hotel booking to check its existence
		const hotelBooking = await HotelBooking.findById(id).session(session);
		if (!hotelBooking) {
			throw new HttpError(404, "Hotel Booking not found");
		}

		// Delete the hotel booking
		await HotelBooking.deleteOne(
			{ _id: id, touristID: userid },
			{ session },
		);

		await session.commitTransaction();

		return hotelBooking; // Return the deleted hotel booking information if needed
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
}
