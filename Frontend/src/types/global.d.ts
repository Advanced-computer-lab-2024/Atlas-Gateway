import { IFlight } from "../../../Backend/src/Models/Flight/flight.model";
import { Currency } from "./consts";
import { EAccountType } from "./enums";

export type TUser = {
	_id: string;
	username: string;
	name?: string;
	type: EAccountType;
	currency: Currency;
	acceptedTerms?: boolean;
	isVerified?: boolean;
};

export type TPassword = {
	password: string;
	confirmPassword: string;
};

export type TOtp = {
	otp: string;
};

export type TPlace = {
	_id: string;
	name: string;
	description: string;
	location: string;
	avgRating: number;
	imagesPath: string[];
	categories: TCategory[];
	openingHours: {
		sunday: TOpeningHours;
		monday: TOpeningHours;
		tuesday: TOpeningHours;
		wednesday: TOpeningHours;
		thursday: TOpeningHours;
		friday: TOpeningHours;
		saturday: TOpeningHours;
	};
	tags: TTag[];
	ticketPrices: {
		foreigner: number;
		native: number;
		student: number;
	};
};

type TOpeningHours = {
	open: string;
	close: string;
	dayOff: boolean;
};

export type TProduct = {
	_id: string;
	sellerId: string;
	name: string;
	description: string;
	price: number;
	imagePath: string;
	sellerId: string;
	avgRating: number;
	reviews: string[];
	isArchived: boolean;
	quantity: number;
	sales: number;
	touristWishlist: string[];
	reviews: string[];
	avgRating: number;
	isArchived: boolean;
};

export type TActivity = {
	_id: string;
	name: string;
	description: string;
	dateTime: string;
	location: string;
	minPrice: number;
	maxPrice: number;
	tags: TTag[];
	categories: TCategory[];
	specialDiscounts: number;
	isOpen: boolean;
	avgRating: number;
	tourists: string[];
	touristBookmarks: string[];
	numberOfBookings: number;
};

export interface TAdmin extends TUser {
	email: string;
	password: string;
}

export interface TGovernor extends TUser {
	email: string;
	password: string;
}

export interface TTourist extends TUser {
	email: string;
	mobile: string;
	address: string[];
	currency: Currency;
	loyaltyPoints: number;
	walletBalance: number;
	level: 1 | 2 | 3;
	purchaseProducts: TProduct[];
	wishlistproducts: TProduct[];
	nationality: string;
	occupation: string;
	bookedActivities: TActivity[];
	bookmarkedActivities: TActivity[];
	bookedItineraries: TItinerary[];
	bookmarkedItineraries: TItinerary[];
	bookedTransportations: TTransportation[];
	bookedFlights: IFlight[]; // will be changed later
	preferredTags: TTag[];
	bookedHotelOffers: IHotelBooking[];
	cart: {
		product: TProduct;
		quantity: number;
	}[];
}

export interface TTouristApi extends TUser {
	email: string;
	mobile: string;
	address: string;
	currency: Currency;
	loyaltyPoints: number;
	walletBalance: number;
	level: 1 | 2 | 3;
	purchaseProducts: string[];
	wishlistproducts: string[];
	bookedActivities: string[];
	bookmarkedActivities: string[];
	bookedItineraries: string[];
	bookmarkedItineraries: string[];
	bookedTransportations: string[];
	preferredTags: string[];
}

export interface TSeller extends TUser {
	companyName: string;
	email: string;
	description: string;
	idPath: string;
	taxCardPath: string;
	imagePath: string;
}

export interface TAdvetisor extends TUser {
	email: string;
	hotline: number;
	website: string;
	password: string;
	description: string;
	idPath: string;
	taxCardPath: string;
	imagePath: string;
}

export interface TTransportationAdvertiser extends TUser {
	email: string;
	hotline: number;
	website: string;
	password: string;
	description: string;
	idPath: string;
	taxCardPath: string;
	imagePath: string;
}

export interface TTourGuide extends TUser {
	email: string;
	mobile: string;
	experience: number;
	prevWork: string;
	description: string;
	idPath: string;
	certificatePath: string;
	imagePath: string;
}

export interface TTag {
	_id?: string;
	name: string;
	type?: string;
}

export interface TCategory {
	_id?: string;
	name: string;
}

export interface TComplaint {
	_id: string;
	touristname: string;
	title: string;
	body: string;
	status: string;
	createdBy: TUser;
	date: string;
	reply: string;
	replyedBy: TUser;
	createdAt: string;
	updatedAt: string;
}

export interface TItinerary {
	_id: string;
	title: string;
	language: string;
	price: number;
	availability: number;
	pickUpLocation: string;
	dropOffLocation: string;
	isActive: boolean;
	isAppropriate: boolean;
	startDateTime: string;
	endDateTime: string;
	activities: {
		activity?: string;
		title: string;
		dateTime: string;
		durationM: number;
	}[];
	tags: TTag[];
	createdBy: string;
	numberOfBookings: number;
	reviews: {
		userId: string;
		review: string;
		rating: number;
	};
	avgRating: number;
	totalNumberOfRatings: number;
	accessibility: string;
	timeline: string;
	tourists: string[];
	touristBookmarks: string[];
}

export interface TFlights {
	originLocationCode: string;
	destinationLocationCode: string;
	departureDate: string;
	returnDate?: string;
	adults: number;
	directFlightsOnly: boolean;
	travelClass: string;
}

export interface THotel {
	chainCode: string;
	iataCode: string;
	dupeId: number;
	name: string;
	hotelId: string;
	geoCode: {
		latitude: number;
		longitude: number;
	};
	address: {
		countryCode: string;
	};
	lastUpdate: string;
}

export interface THotelRating {
	type: string;
	numberOfReviews: number;
	numberOfRatings: number;
	hotelId: string;
	overallRating: number;
	sentiments: {
		sleepQuality: number;
		service: number;
		facilities: number;
		roomComforts: number;
		valueForMoney: number;
		catering: number;
		location: number;
		pointsOfInterest: number;
		staff: number;
	};
}

export interface THotelOffer {
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
}

export interface THotelOffers {
	data: [
		{
			type: string;
			hotel: {
				type: string;
				hotelId: string;
				chainCode: string;
				dupeId: string;
				name: string;
				cityCode: string;
				latitude: number;
				longitude: number;
			};
			available: boolean;
			offers: THotelOffer[];
			self: string;
		},
	];
}

export interface TReview {
	_id: string;
	tourist: TTourist;
	text: string;
	rating: number;
}

export interface TTransportation {
	_id: string;
	name: string;
	type: "Bus" | "Car" | "Train" | "Plane" | "Boat";
	price: number;
	availability: number;
	pickUpLocation: string;
	dropOffLocation: string;
	pickUpTime: string;
	dropOffTime: string;
	numberOfBookings: number;
	tourists: Types.ObjectId[];
}

export interface IHotelBooking {
	touristID: Types.ObjectId;
	hotel: {
		hotelId: string;
		chainCode: string;
		name: string;
		cityCode: string;
	};
	offer: THotelOffer;
}

export interface TPromo {
	_id: string;
	promoCode: string;
	discountPercentage: number;
	expiryDate: string;
	allUsers: boolean;
}

export interface TOrder {
	_id: string;
	touristId: string;
	products: {
		productId: string;
		product: TProduct;
		quantity: number;
	}[];
	totalPrice: number;
	status: string;
	date: string;
	address: string;
	paymentMethod: string;
}

export interface TNotification {
	_id: string;
	type: "reminder" | "info" | "warning" | "error";
	message: string;
	isRead: boolean;
	createdAt: Date;
}
