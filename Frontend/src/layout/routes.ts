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

const transportationRoute: NavbarRoute = {
	name: "Transportation",
	to: "/transportations",
};

const touristRoutes: NavbarRoute[] = [
	placesRoute,
	productsRoute,
	activitiesRoute,
	intinerariesRoute,
	transportationRoute,
];

const sellerRoutes: NavbarRoute[] = [productsRoute];

const adminRoutes: NavbarRoute[] = [
	productsRoute,
	activitiesRoute,
	{
		name: "Dashboard",
		to: "/admin/dashboard",
	},
	{
		name: "Users",
		to: "/admin/users",
	},
	{
		name: "Settings",
		to: "/admin/settings",
	},
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

const transportationAdvertiserRoutes: NavbarRoute[] = [
	productsRoute,
	transportationRoute,
];

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
