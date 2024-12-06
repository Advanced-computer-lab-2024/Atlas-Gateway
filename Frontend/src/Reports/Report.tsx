import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";

import AdminReport from "./Admin/AdminReport";
import AdvertiserReport from "./Advertiser/AdvertiserReport";
import SellerReport from "./Seller/SellerReport";
import TourGuideReport from "./Tour Guide/TourGuideReport";
import TransportationAdvertiserReport from "./Transportation/TransportationReport";

export default function Report() {
	const { user } = useLoginStore();

	switch (user?.type) {
		case EAccountType.Advertiser:
			return <AdvertiserReport />;
		case EAccountType.Guide:
			return <TourGuideReport />;
		case EAccountType.Seller:
			return <SellerReport />;
		case EAccountType.TransportationAdvertiser:
			return <TransportationAdvertiserReport />;
		case EAccountType.Admin:
			return <AdminReport />;
		default:
			return <p>Unknown user type</p>;
	}
}
