import { Types, now } from "mongoose";

import HttpError from "../../Errors/HttpError";
import { Activity } from "../../Models/Travel/activity.model";
import { IItinerary, Itinerary } from "../../Models/Travel/itinerary.model";
import { ITransportation } from "../../Models/Travel/transportation.model";
import { ITourist, Tourist } from "../../Models/Users/tourist.model";
import { hashPassword } from "../Auth/password.service";
import uniqueUsername from "../Auth/username.service";
import {
	checkPromoService,
	deletePromoByCodeService,
} from "../Promo/promo.service";

export const createTourist = async (
	username: string,
	email: string,
	password: string,
	mobile: string,
	nationality: string,
	dob: Date,
	occupation: string,
) => {
	const resultUnique = await uniqueUsername(username);
	if (!resultUnique) {
		throw new HttpError(400, "Username Should Be Unique");
	}
	const hashedPassword = await hashPassword(password);

	const tourist = await Tourist.create({
		username: username,
		email: email,
		password: hashedPassword,
		mobile: mobile,
		nationality: nationality,
		dob: dob,
		occupation: occupation,
	});

	return tourist;
};

export const getTouristById = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "id is invalid");
	}

	const tourist = await Tourist.findById(id).populate([
		"bookedItineraries",
		"bookmarkedItineraries",
		"bookedActivities",
		"bookmarkedActivities",
		"bookedTransportations",
		"purchaseProducts",
		"wishlistproducts",
		"preferredTags",
		"bookedFlights",
		"bookedHotelOffers",
		"cart.product",
	]);

	return tourist;
};

export const getTourists = async () => {
	const tourists = await Tourist.find();
	return tourists;
};

export const updateTourist = async (id: string, newTourist: ITourist) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Tourist id is not valid");
	}

	const tourist = await Tourist.findByIdAndUpdate(id, newTourist, {
		new: true,
	});
	return tourist;
};

export const deleteTourist = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new HttpError(400, "Id is Invalid and Required");
	}
	const tourist = await Tourist.findByIdAndDelete(id);

	return tourist;
};

export const addBookedActivity = async (
	touristId: string,
	paymentType: string,
	activityId: string,
	promoCode: string,
	minPrice: number,
	maxPrice: number,
) => {
	if (!Types.ObjectId.isValid(activityId)) {
		throw new HttpError(400, "Activity id is not valid");
	}

	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	if (!isOlderThan18(tourist.dob)) {
		throw new HttpError(400, "Tourist must be older than 18");
	}

	if (maxPrice > tourist.walletBalance && paymentType === "wallet") {
		throw new HttpError(
			400,
			"You do not have enough balance in your wallet",
		);
	}

	if (promoCode != "") {
		const promo = await checkPromoService(promoCode, touristId);
		await deletePromoByCodeService(promoCode);
		maxPrice = maxPrice - maxPrice * (promo?.discountPercentage! / 100);
	}

	let newWalletBalance = tourist.walletBalance;
	if (tourist.walletBalance >= maxPrice && paymentType === "wallet") {
		newWalletBalance = tourist.walletBalance - maxPrice;
	}

	const newLoyaltyPoints =
		tourist.loyaltyPoints +
		((tourist.level / 2) * (minPrice + maxPrice)) / 2;
	const newMaxCollectedLoyaltyPoints =
		tourist.maxCollectedLoyaltyPoints + newLoyaltyPoints;
	const newLevel =
		newMaxCollectedLoyaltyPoints <= 100000
			? 1
			: newMaxCollectedLoyaltyPoints <= 500000
				? 2
				: 3;
	await tourist.updateOne({
		$push: {
			bookedActivities: activityId,
			payment: { type: paymentType, event: activityId, amount: maxPrice },
		},
		loyaltyPoints: newLoyaltyPoints,
		maxCollectedLoyaltyPoints: newMaxCollectedLoyaltyPoints,
		level: newLevel,
		walletBalance: newWalletBalance,
	});

	await tourist.validate();

	return tourist;
};

export const addBookmarkedActivity = async (
	touristId: string,
	activityId: string,
) => {
	if (!Types.ObjectId.isValid(activityId)) {
		throw new HttpError(400, "Activity id is not valid");
	}
	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	await tourist.updateOne({
		$push: { bookmarkedActivities: activityId },
	});
	return tourist;
};

export const removeBookmarkedActivity = async (
	touristId: string,
	activityId: string,
) => {
	if (!Types.ObjectId.isValid(activityId)) {
		throw new HttpError(400, "Activity id is not valid");
	}
	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	const removed = await tourist.updateOne({
		$pull: { bookmarkedActivities: activityId },
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to remove bookmarked activity");
	}

	return tourist;
};

export function isOlderThan18(dob: Date): boolean {
	const today = new Date();

	let age = today.getFullYear() - dob.getFullYear();

	const monthDiff = today.getMonth() - dob.getMonth();
	const dayDiff = today.getDate() - dob.getDate();

	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age--;
	}

	return age >= 18;
}

export const addBookedItinerary = async (
	touristId: string,
	itineraryId: string,
	paymentType: string,
	promoCode: string,
	itineraryPrice: number,
) => {
	if (!Types.ObjectId.isValid(itineraryId)) {
		throw new HttpError(400, "Itinerary id is not valid");
	}

	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	if (!isOlderThan18(tourist.dob)) {
		throw new HttpError(400, "Tourist must be older than 18");
	}

	if (itineraryPrice > tourist.walletBalance && paymentType === "wallet") {
		throw new HttpError(
			400,
			"You do not have enough balance in your wallet",
		);
	}
	if (promoCode != "") {
		const promo = await checkPromoService(promoCode, touristId);
		await deletePromoByCodeService(promoCode);
		itineraryPrice =
			itineraryPrice -
			itineraryPrice * (promo?.discountPercentage! / 100);
	}

	let newWalletBalance = tourist.walletBalance;
	if (tourist.walletBalance >= itineraryPrice && paymentType === "wallet") {
		newWalletBalance = tourist.walletBalance - itineraryPrice;
	}

	const newLoyaltyPoints =
		tourist.loyaltyPoints + (tourist.level / 2) * itineraryPrice;
	const newMaxCollectedLoyaltyPoints =
		tourist.maxCollectedLoyaltyPoints + newLoyaltyPoints;
	const newLevel =
		newMaxCollectedLoyaltyPoints <= 100000
			? 1
			: newMaxCollectedLoyaltyPoints <= 500000
				? 2
				: 3;
	await tourist.updateOne(
		{
			$push: {
				bookedItineraries: itineraryId,
				payment: {
					type: paymentType,
					event: itineraryId,
					amount: itineraryPrice,
				},
			},
			loyaltyPoints: newLoyaltyPoints,
			maxCollectedLoyaltyPoints: newMaxCollectedLoyaltyPoints,
			level: newLevel,
			walletBalance: newWalletBalance,
		},
		{ new: true },
	);

	return tourist;
};

export const addBookmarkItenerary = async (
	touristId: string,
	itineraryId: string,
) => {
	if (!Types.ObjectId.isValid(itineraryId)) {
		throw new HttpError(400, "Itinerary id is not valid");
	}
	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	await tourist.updateOne({
		$push: { bookmarkedItineraries: itineraryId },
	});
	return tourist;
};

export const removeBookmarkItinerary = async (
	touristId: string,
	itineraryId: string,
) => {
	if (!Types.ObjectId.isValid(itineraryId)) {
		throw new HttpError(400, "Itinerary id is not valid");
	}
	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	const removed = await tourist.updateOne({
		$pull: { bookmarkedItineraries: itineraryId },
	});
	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Itinerary not found in bookmarks");
	}
	return tourist;
};

export const addBookedTransportation = async (
	touristId: string,
	transportationId: string,
) => {
	if (!Types.ObjectId.isValid(transportationId)) {
		throw new HttpError(400, "Transportation id is not valid");
	}

	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	if (!isOlderThan18(tourist.dob)) {
		throw new HttpError(400, "Tourist must be older than 18");
	}

	await tourist.updateOne(
		{
			$push: { bookedTransportations: transportationId },
		},
		{ new: true },
	);

	return tourist;
};

export const addBookedHotelOffer = async (
	touristId: string,
	hotelOfferId: string,
) => {
	if (!Types.ObjectId.isValid(hotelOfferId)) {
		throw new HttpError(400, "Hotel Offer id is not valid");
	}

	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	if (!isOlderThan18(tourist.dob)) {
		throw new HttpError(400, "Tourist must be older than 18");
	}

	await tourist.updateOne(
		{
			$push: { bookedHotelOffers: hotelOfferId },
		},
		{ new: true },
	);

	return tourist;
};

export const cancelItinerary = async (
	touristId: string,
	itineraryId: string,
	itineraryPrice: number,
) => {
	if (!Types.ObjectId.isValid(itineraryId)) {
		throw new HttpError(400, "Itinerary id is not valid");
	}
	if (!Types.ObjectId.isValid(touristId)) {
		throw new HttpError(400, "Tourist id is not valid");
	}
	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	if (
		!tourist.bookedItineraries.some((itinerary: any) =>
			itinerary._id.equals(itineraryId),
		)
	) {
		throw new HttpError(404, "Itinerary not found in the tourist's list");
	}
	const payment = tourist.payment.filter((payment: any) =>
		payment.event.equals(itineraryId),
	);
	let newWalletBalance = tourist.walletBalance;
	if (payment[0].type === "wallet") {
		newWalletBalance += payment[0].amount;
	}
	const newLoyaltyPoints =
		tourist.loyaltyPoints - (tourist.level / 2) * itineraryPrice;
	const newMaxCollectedLoyaltyPoints =
		tourist.maxCollectedLoyaltyPoints - newLoyaltyPoints;
	const newLevel =
		newMaxCollectedLoyaltyPoints <= 100000
			? 1
			: newMaxCollectedLoyaltyPoints <= 500000
				? 2
				: 3;
	const removed = await tourist.updateOne({
		$pull: {
			bookedItineraries: itineraryId,
			payment: { event: itineraryId },
		},
		loyaltyPoints: newLoyaltyPoints,
		maxCollectedLoyaltyPoints: newMaxCollectedLoyaltyPoints,
		level: newLevel,
		walletBalance: newWalletBalance,
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel transportation booking");
	}

	return tourist;
};

export const cancelActivity = async (
	touristId: string,
	activityId: string,
	minPrice: number,
	maxPrice: number,
) => {
	if (!Types.ObjectId.isValid(activityId)) {
		throw new HttpError(400, "Activity id is not valid");
	}

	const tourist = await Tourist.findById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	if (
		!(tourist.bookedActivities as Types.ObjectId[]).includes(
			new Types.ObjectId(activityId),
		)
	) {
		throw new HttpError(404, "Activity not found in the tourist's list");
	}
	const payment = tourist.payment.filter((payment: any) =>
		payment.event.equals(activityId),
	);
	let newWalletBalance = tourist.walletBalance;
	if (payment[0].type === "wallet") {
		newWalletBalance += payment[0].amount;
	}

	const newLoyaltyPoints =
		tourist.loyaltyPoints -
		((tourist.level / 2) * (minPrice + maxPrice)) / 2;
	const newMaxCollectedLoyaltyPoints =
		tourist.maxCollectedLoyaltyPoints - newLoyaltyPoints;
	const newLevel =
		newMaxCollectedLoyaltyPoints <= 100000
			? 1
			: newMaxCollectedLoyaltyPoints <= 500000
				? 2
				: 3;
	const removed = await tourist.updateOne({
		$pull: {
			bookedActivities: activityId,
			payment: { event: activityId },
		},
		loyaltyPoints: newLoyaltyPoints,
		maxCollectedLoyaltyPoints: newMaxCollectedLoyaltyPoints,
		level: newLevel,
		walletBalance: newWalletBalance,
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel activity booking");
	}

	return tourist;
};

export const cancelTransportation = async (
	touristId: string,
	transportationId: string,
) => {
	if (!Types.ObjectId.isValid(transportationId)) {
		throw new HttpError(400, "Transportation id is not valid");
	}
	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	const transportation = (
		tourist.bookedTransportations as ITransportation[]
	).some((transportation: Partial<ITransportation>) => {
		return transportation.id.equals(transportationId);
	});

	if (!transportation) {
		throw new HttpError(
			404,
			"Transportation not found in the tourist's list",
		);
	}

	const removed = await tourist.updateOne({
		$pull: { bookedTransportations: transportationId },
	});

	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Failed to cancel Transportation booking");
	}

	return tourist;
};

export const addwishlistProduct = async (
	touristId: string,
	productId: string,
) => {
	if (!Types.ObjectId.isValid(productId)) {
		throw new HttpError(400, "Product id is not valid");
	}
	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	await tourist.updateOne({
		$push: { wishlistproducts: productId },
	});
	return tourist;
};

export const removeWishlistProduct = async (
	touristId: string,
	productId: string,
) => {
	if (!Types.ObjectId.isValid(productId)) {
		throw new HttpError(400, "Product id is not valid");
	}
	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	const removed = await tourist.updateOne({
		$pull: { wishlistproducts: productId },
	});
	if (removed.modifiedCount === 0) {
		throw new HttpError(404, "Product not found in wishlist");
	}
	return tourist;
};

/*
 * Soft delete tourist and unbook all activities, itineraries and transportation
 * @param id
 * @throws {HttpError}
 * @returns {Promise<ITourist>}
 */

export const softDeleteTourist = async (id: string) => {
	const tourist = await getTouristById(id);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	await tourist.updateOne({ isDeleted: true });

	return tourist;
};

export const redeemPoints = async (id: string) => {
	const tourist = await Tourist.findById(id);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}
	if (tourist.loyaltyPoints < 10000) {
		throw new HttpError(404, "Not enough points to redeem");
	}
	const newLoyaltyPoints = tourist.loyaltyPoints - 10000;
	const newWalletBalance = tourist.walletBalance + 100;
	return await tourist.updateOne(
		{
			loyaltyPoints: newLoyaltyPoints,
			walletBalance: newWalletBalance,
		},
		{ new: true },
	);
};
export const viewWallet = async (touristId: String) => {
	const tourist = await Tourist.findById(touristId);
	if (!tourist) {
		throw new HttpError(404, "tourist not found");
	}
	return tourist?.walletBalance;
};
export const viewUpcomingActivities = async (touristId: String) => {
	const now = new Date();
	const tourist = await Tourist.findById(touristId).populate({
		path: "bookedActivities",
		match: { dateTime: { $gt: now } },
	});
	if (!tourist) {
		throw new HttpError(404, "tourist not found");
	}
	return tourist.bookedActivities;
};

export const viewPastActivities = async (touristId: String) => {
	const now = new Date();
	const tourist = await Tourist.findById(touristId).populate({
		path: "bookedActivities",
		match: { dateTime: { $lt: now } },
	});
	if (!tourist) {
		throw new HttpError(404, "tourist not found");
	}
	return tourist.bookedActivities;
};

export const viewUpcomingItineraries = async (touristId: String) => {
	const now = new Date();
	const tourist = await Tourist.findById(touristId).populate({
		path: "bookedItineraries",
		match: { startDateTime: { $gt: now } },
	});
	if (!tourist) {
		throw new HttpError(404, "tourist not found");
	}
	return tourist.bookedItineraries;
};

export const viewPastItineraries = async (touristId: String) => {
	const now = new Date();
	const tourist = await Tourist.findById(touristId).populate({
		path: "bookedItineraries",
		match: { endDateTime: { $lt: now } },
	});
	if (!tourist) {
		throw new HttpError(404, "tourist not found");
	}
	return tourist.bookedItineraries;
};

export const requestActivityNotification = async (
	activityId: String,
	touristId: String,
) => {
	const activity = await Activity.findById(activityId);
	const tourist = await Tourist.findById(touristId);
	if (!activity) {
		throw new HttpError(404, "no activity found with this id");
	}
	if (!tourist) {
		throw new HttpError(404, "no tourist found with this id");
	}
	await activity.updateOne({
		$push: { notificationRequested: touristId },
	});
	return activity;
};

export const unrequestActivityNotification = async (
	activityId: String,
	touristId: String,
) => {
	const activity = await Activity.findById(activityId);
	const tourist = await Tourist.findById(touristId);
	if (!activity) {
		throw new HttpError(404, "no activity found with this id");
	}
	if (!tourist) {
		throw new HttpError(404, "no tourist found with this id");
	}
	await activity.updateOne({
		$pull: { notificationRequested: touristId },
	});
	return activity;
};

export const requestItineraryNotification = async (
	itineraryId: String,
	touristId: String,
) => {
	const itinerary = await Itinerary.findById(itineraryId);
	const tourist = await Tourist.findById(touristId);
	if (!itinerary) {
		throw new HttpError(404, "no Itinerary found with this id");
	}
	if (!tourist) {
		throw new HttpError(404, "no tourist found with this id");
	}
	await itinerary.updateOne({
		$push: { notificationRequested: tourist?.id },
	});
	return itinerary;
};

export const unrequestItineraryNotification = async (
	itineraryId: String,
	touristId: String,
) => {
	const itinerary = await Itinerary.findById(itineraryId);

	const tourist = await Tourist.findById(touristId);
	if (!itinerary) {
		throw new HttpError(404, "no Itinerary found with this id");
	}
	if (!tourist) {
		throw new HttpError(404, "no tourist found with this id");
	}
	await itinerary.updateOne({
		$pull: { notificationRequested: touristId },
	});
	return itinerary;
};

export const addProductToCart = async (
	touristId: string,
	productId: string,
) => {
	if (!Types.ObjectId.isValid(productId)) {
		throw new HttpError(400, "Product id is not valid");
	}

	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	const productIndex = tourist.cart.findIndex((item) =>
		item.product.equals(productId),
	);
	if (productIndex !== -1 && tourist.cart[productIndex]) {
		tourist.cart[productIndex].quantity++;
	} else {
		tourist.cart.push({
			product: new Types.ObjectId(productId),
			quantity: 1,
		});
	}

	await tourist.save();

	return tourist;
};

export const removeProductFromCart = async (
	touristId: string,
	productId: string,
) => {
	if (!Types.ObjectId.isValid(productId)) {
		throw new HttpError(400, "Product id is not valid");
	}

	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	const productIndex = tourist.cart.findIndex((item) =>
		item.product.equals(productId),
	);
	if (productIndex === -1) {
		throw new HttpError(404, "Product not found in the cart");
	}

	tourist.cart.splice(productIndex, 1);

	await tourist.save();

	return tourist;
};

export const updateProductQuantity = async (
	touristId: string,
	productId: string,
	quantity: number,
) => {
	if (!Types.ObjectId.isValid(productId)) {
		throw new HttpError(400, "Product id is not valid");
	}

	const tourist = await getTouristById(touristId);
	if (!tourist) {
		throw new HttpError(404, "Tourist not found");
	}

	const product = tourist.cart.find((item) => item.product.equals(productId));
	if (!product) {
		throw new HttpError(404, "Product not found in the cart");
	}

	product.quantity = quantity;

	await tourist.save();

	return tourist;
};
