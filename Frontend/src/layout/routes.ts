import { EAccountType } from "@/types/enums";

export type NavbarRoute = {
	name: string;
	to: string;
};

const productsRoute: NavbarRoute = {
	name: "Products",
	to: "/products",
};

const activitiesRoute: NavbarRoute = {
	name: "Activities",
	to: "/activities",
};

const placesRoute: NavbarRoute = {
	name: "Museums & Historical locations",
	to: "/places",
};

const intinerariesRoute: NavbarRoute = {
	name: "Intineraries",
	to: "/itineraries",
};

const flightsRoute: NavbarRoute = {
	name: "Flights",
	to: "/flights",
};

const transportationRoute: NavbarRoute = {
	name: "Transportation",
	to: "/transportations",
};

const hotelsRoute: NavbarRoute = {
	name: "Hotels",
	to: "/hotels",
};

const touristRoutes: NavbarRoute[] = [
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
