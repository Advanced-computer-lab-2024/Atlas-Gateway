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
	address: string;
	currency: Currency;
	loyaltyPoints: number;
	walletBalance: number;
	level: 1 | 2 | 3;
	purchaseProducts: TProduct[];
	bookedActivities: TActivity[];
	bookedItineraries: TItinerary[];
	bookedTransportations: TTransportation[];
	bookedFlights: IFlight[]; // will be changed later
	preferredTags: TTag[];
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
	bookedActivities: string[];
	bookedItineraries: string[];
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

export interface THotels {
	// cityCode: string;
	// checkInDate: Date;
	// checkOutDate: Date;
	// adults: number;
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
