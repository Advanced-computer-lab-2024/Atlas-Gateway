import { EAccountType } from "@/types/enums";

export type NavbarRoute = {
	name: string;
	to: string;
	description: string;
};

export const productsRoute: NavbarRoute = {
	name: "Products",
	to: "/products",
	description: "Find the best products for your trip!",
};

export const activitiesRoute: NavbarRoute = {
	name: "Activities",
	to: "/activities",
	description: "Find the best activities for your trip!",
};

export const placesRoute: NavbarRoute = {
	name: "Museums & Historical locations",
	to: "/places",
	description: "Find the best museums and historical places to visit!",
};

export const intinerariesRoute: NavbarRoute = {
	name: "Intineraries",
	to: "/itineraries",
	description: "Find the best intineraries for your trip",
};

export const flightsRoute: NavbarRoute = {
	name: "Flights",
	to: "/flights",
	description: "Find the best flights for your trip",
};

export const transportationRoute: NavbarRoute = {
	name: "Transportation",
	to: "/transportations",
	description: "Find the best transportation for your trip",
};

export const hotelsRoute: NavbarRoute = {
	name: "Hotels",
	to: "/hotels",
	description: "Find the best hotels for your stay",
};

export const touristRoutes: NavbarRoute[] = [
	placesRoute,
	productsRoute,
	activitiesRoute,
	intinerariesRoute,
	transportationRoute,
	flightsRoute,
	hotelsRoute,
];

const sellerRoutes: NavbarRoute[] = [productsRoute];

const adminRoutes: NavbarRoute[] = [
	productsRoute,
	activitiesRoute,
];

const tourGuideRoutes: NavbarRoute[] = [
	placesRoute,
	activitiesRoute,
	intinerariesRoute,
];

const advertiserRoutes: NavbarRoute[] = [
	intinerariesRoute,
	activitiesRoute,
	placesRoute,
];

const transportationAdvertiserRoutes: NavbarRoute[] = [transportationRoute];

const guestRoutes: NavbarRoute[] = [
	placesRoute,
	activitiesRoute,
	intinerariesRoute,
];

const tourismGovernerRoutes: NavbarRoute[] = [placesRoute];

export const accountRoutes: Record<EAccountType, NavbarRoute[]> = {
	[EAccountType.Tourist]: touristRoutes,
	[EAccountType.Seller]: sellerRoutes,
	[EAccountType.Admin]: adminRoutes,
	[EAccountType.Guide]: tourGuideRoutes,
	[EAccountType.Advertiser]: advertiserRoutes,
	[EAccountType.TourismGovernor]: tourismGovernerRoutes,
	[EAccountType.Guest]: guestRoutes,
	[EAccountType.TransportationAdvertiser]: transportationAdvertiserRoutes,
};
