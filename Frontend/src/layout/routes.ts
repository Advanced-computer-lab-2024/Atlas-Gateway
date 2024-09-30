import { EAccountType } from '@/types/enums';


export type NavbarRoute = {
	name: string;
	to: string;
};

const productsRoute: NavbarRoute = {
	name: 'Products',
	to: '/products',
};
const activitiesRoute: NavbarRoute = {
	name: 'Activities',
	to: '/activities',
};
const exploreRoute: NavbarRoute = {
	name: 'Explore',
	to: '/explore',
};
const museumsAndHistoricalPlacesRoute: NavbarRoute = {
	name: 'Museums & Historical Places',
	to: '/museums-and-historical-places',
};
const intinerariesRoute: NavbarRoute = {
	name: 'Intineraries',
	to: '/intineraries',
};

const touristRoutes: NavbarRoute[] = [
	productsRoute,
	activitiesRoute,
	exploreRoute,
];

const sellerRoutes: NavbarRoute[] = [productsRoute];

const adminRoutes: NavbarRoute[] = [
	productsRoute,
	activitiesRoute,
	{
		name: 'Dashboard',
		to: '/admin/dashboard',
	},
	{
		name: 'Users',
		to: '/admin/users',
	},
	{
		name: 'Settings',
		to: '/admin/settings',
	},
];

const tourGuideRoutes: NavbarRoute[] = [
	intinerariesRoute,
	activitiesRoute,
	museumsAndHistoricalPlacesRoute,
];

const advertisorRoutes: NavbarRoute[] = [
	intinerariesRoute,
	activitiesRoute,
	museumsAndHistoricalPlacesRoute,
];

const tourismGovernerRoutes: NavbarRoute[] = [
	intinerariesRoute,
	activitiesRoute,
	museumsAndHistoricalPlacesRoute,
];

export const accountRoutes: Record<EAccountType, NavbarRoute[]> = {
	[EAccountType.Tourist]: touristRoutes,
	[EAccountType.Seller]: sellerRoutes,
	[EAccountType.Admin]: adminRoutes,
	[EAccountType.Guide]: tourGuideRoutes,
	[EAccountType.Advertisor]: advertisorRoutes,
	[EAccountType.TourismGovernor]: tourismGovernerRoutes,
};

