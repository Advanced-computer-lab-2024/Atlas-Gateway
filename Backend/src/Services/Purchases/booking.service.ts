import { Booking } from "../../Models/Purchases/booking.model";

export const createBooking = async (
	touristId: string,
	totalPrice: number,
	options: { activityId?: string; itineraryId?: string } = {},
) => {
	const { activityId, itineraryId } = options;

	if (!activityId && !itineraryId) {
		throw new Error("Either activity or itinerary must be provided.");
	}

	const booking = new Booking({
		touristId,
		activityId,
		itineraryId,
		totalPrice,
	});
	await booking.save();
	return booking;
};

export const getBookingById = async (id: string) => {
	const booking = await Booking.findById(id);
	return booking;
};

export const getBookingByTouristId = async (touristId: string) => {
	const booking = await Booking.find({ touristId });

	return booking;
};

export const getBookingByActivityId = async (activityId: string) => {
	const booking = await Booking.find({ activityId });

	return booking;
};

export const getBookingByItineraryId = async (itineraryId: string) => {
	const booking = await Booking.find({ itineraryId });

	return booking;
};

export const updateBooking = async (id: string, data: any) => {
	const booking = await Booking.findByIdAndUpdate(id, data, {
		new: true,
	});
	return booking;
};

export const deleteBooking = async (id: string) => {
	const booking = await Booking.findByIdAndDelete(id);

	return booking;
};
