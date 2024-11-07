import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";

import AdvertiserProfile from "./Adveritser/AdvertiserProfile";
import SellerProfile from "./Seller/SellerProfile";
import TourGuideProfile from "./TourGuide/TourGuideProfile";
import TouristProfile from "./Tourist/TouristProfile";
import TransportationAdvertiserProfile from "./TransportationAdvertiserProfile";
import GovernorProfile from "./GovernorProfile";

export default function Profile() {
	const { user } = useLoginStore();

	switch (user?.type) {
		case EAccountType.Advertiser:
			return <AdvertiserProfile />;
		case EAccountType.Tourist:
			return <TouristProfile />;
		case EAccountType.Guide:
			return <TourGuideProfile />;
		case EAccountType.Seller:
			return <SellerProfile />;
		case EAccountType.TransportationAdvertiser:
			return <TransportationAdvertiserProfile />;
		case EAccountType.TourismGovernor:
			return <GovernorProfile />;
		default:
			return <p>Unknown user type</p>;
	}
}
