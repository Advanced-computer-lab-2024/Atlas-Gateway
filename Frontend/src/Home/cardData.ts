import { EAccountType } from "@/types/enums";

type TCard = {
	title: string;
	description: string;
	href: string;
};

const productsCard = {
	title: "Products",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	href: "/products",
};

const activitiesCard = {
	title: "Activities",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	Text: "View Activities",
	href: "/activities",
};

const itinerariesCard = {
	title: "Itineraries",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	Text: "View Itineraries",
	href: "/itineraries",
};

const placesCard = {
	title: "Places",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	Text: "View Places",
	href: "/places",
};

export const cardsMap: Record<EAccountType, TCard[]> = {
	[EAccountType.Tourist]: [
		placesCard,
		productsCard,
		activitiesCard,
		itinerariesCard,
	],
	[EAccountType.Guide]: [placesCard, activitiesCard, itinerariesCard],
	[EAccountType.Seller]: [productsCard],
	[EAccountType.Advertiser]: [itinerariesCard, activitiesCard, placesCard],
	[EAccountType.Admin]: [
		productsCard,
		activitiesCard,
		itinerariesCard,
		placesCard,
	],
	[EAccountType.TourismGovernor]: [placesCard],
	[EAccountType.Guest]: [placesCard, activitiesCard, itinerariesCard],
	[EAccountType.TransportationAdvertiser]: [productsCard],
};
