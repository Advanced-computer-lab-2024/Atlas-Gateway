import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";

import AdvertiserProfile from "./AdvertiserProfile";
import SellerProfile from "./SellerProfile";
import TourGuideProfile from "./TourGuideProfile";
import TouristProfile from "./TouristProfile";

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
		default:
			return <p>Unknown user type</p>;
	}
}
