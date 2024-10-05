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

export const cardsMap: Record<EAccountType, TCard[]> = {
	[EAccountType.Tourist]: [productsCard, activitiesCard, itinerariesCard],
	[EAccountType.Guide]: [productsCard, activitiesCard, itinerariesCard],
	[EAccountType.Seller]: [productsCard, activitiesCard, itinerariesCard],
	[EAccountType.Advertiser]: [productsCard, activitiesCard, itinerariesCard],
	[EAccountType.Admin]: [productsCard, activitiesCard, itinerariesCard],
	[EAccountType.TourismGovernor]: [
		productsCard,
		activitiesCard,
		itinerariesCard,
	],
};
