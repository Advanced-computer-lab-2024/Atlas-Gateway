import { Admin } from "../../Models/Users/admin.model";
import { Advertiser } from "../../Models/Users/advertiser.model";
import { Governor } from "../../Models/Users/governor.model";
import { Seller } from "../../Models/Users/seller.model";
import { TourGuide } from "../../Models/Users/tourGuide.model";
import { Tourist } from "../../Models/Users/tourist.model";
import { TransportationAdvertiser } from "../../Models/Users/transportation_advertiser.model";

export default async function uniqueUn(username: string) {
	const adminUser = await Admin.find({ username });
	const advertiserUser = await Advertiser.find({ username });
	const governorUser = await Governor.find({ username });
	const sellerUser = await Seller.find({ username });
	const tourGuideUser = await TourGuide.find({ username });
	const touristUser = await Tourist.find({ username });

	if (
		adminUser.length != 0 ||
		advertiserUser.length != 0 ||
		governorUser.length != 0 ||
		sellerUser.length != 0 ||
		tourGuideUser.length != 0 ||
		touristUser.length != 0
	) {
		return false;
	}
	return true;
}

export const findUserByUsername = async (username: string) => {
	let user = await Tourist.findOne({ username });
	if (user) return { user, type: "tourist" };

	user = await Governor.findOne({ username });
	if (user) return { user, type: "governor" };

	user = await TourGuide.findOne({ username });
	if (user) return { user, type: "tour_guide" };

	user = await Seller.findOne({ username });
	if (user) return { user, type: "seller" };

	user = await Advertiser.findOne({ username });
	if (user) return { user, type: "advertiser" };

	user = await Admin.findOne({ username });
	if (user) return { user, type: "admin" };

	user = await TransportationAdvertiser.findOne({
		username,
	});
	if (user) return { user, type: "transportation_advertiser" };

	return null;
};
