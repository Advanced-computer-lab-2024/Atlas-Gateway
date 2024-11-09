import { EAccountType } from "./enums";

export type TUser = {
	_id: string;
	username: string;
	name?: string;
	type: EAccountType;
};

export type TPlace = {
	_id: string;
	name: string;
	description: string;
	location: string;
	avgRating: number;
	images: string[];
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
	name: string;
	description: string;
	price: number;
	images: string[];
	sellerId: string;
	avgRating: number;
	reviews: string[];
	isArchived: boolean;
	quantity: number;
	sales: number;
	availability: number;
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
	currency: string;
	loyaltyPoints: number;
	walletBalance: number;
	purchasedProducts: string[]; // TODO: Check array name
}

export interface TSeller extends TUser {
	companyName: string;
	email: string;
	description: string;
}

export interface TAdvetisor extends TUser {
	email: string;
	hotline: number;
	website: string;
	password: string;
	description: string;
}

export interface TTourGuide extends TUser {
	email: string;
	mobile: string;
	experience: number;
	prevWork: string;
	description: string;
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

export interface TItinerary {
	_id: string;
	title: string;
	language: string;
	price: number;
	availability: number;
	pickUpLocation: string;
	dropOffLocation: string;
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
}

export interface TComment {
	_id: string;
	user: TTourist;
	text: string;
	createdAt: string;
}
