import { useLoginStore } from "@/store/loginStore";

import AdvertiserProfile from "./AdvertiserProfile";
import SellerProfile from "./SellerProfile";
import TourGuideProfile from "./TourGuideProfile";
import TouristProfile from "./TouristProfile";

export default function Profile() {
	const { user } = useLoginStore();

	switch (user?.type) {
		case "adverister":
			return <AdvertiserProfile />;
		case "tourist":
			return <TouristProfile />;
		case "tour_guide":
			return <TourGuideProfile />;
		case "seller":
			return <SellerProfile />;
		default:
			return <p>Unknown user type</p>;
	}
}
