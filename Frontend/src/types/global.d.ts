export type TUser = {
	id: string;
	username: string;
	type: string;
};

export type TPlace = {
	id: string;
	name: string;
	description: string;
	location: string;
	rating: number;
	images: string[];
	categories: string[];
	openingHours: {
		sunday: TOpeningHours;
		monday: TOpeningHours;
		tuesday: TOpeningHours;
		wednesday: TOpeningHours;
		thursday: TOpeningHours;
		friday: TOpeningHours;
		saturday: TOpeningHours;
	};
	tags: string[];
};

type TOpeningHours = {
	open: string;
	close: string;
};

export type TProduct = {
	id: string;
	name: string;
	description: string;
	price: number;
	images: string[];
	seller: TUser;
	rating: number;
	reviews: string[];
};

export type TActivity = {
	id: string;
	name: string;
	dateTime: string;
	location: string;
	minPrice: number;
	maxPrice: number;
	tags: string[];
	categories: string[];
	discounts: string[];
	isBookingsOpen: boolean;
	rating: number;
};
export interface TTourist extends TUser {
	email: string;
	mobileNumber: string;
	walletBalance: number;
}

export interface TSeller extends TUser {
	companyName: string;
	email: string;
	description: string;
}

export interface TAdvetisor extends TUser {
	companyName: string;
	email: string;
	hotline: number;
	website: string;
	description: string;
}

export interface TTourGuide extends TUser {
	name: string;
	email: string;
	mobileNumber: string;
	yearsOfExperience: number;
	previousWork: string;
	description: string;
}
