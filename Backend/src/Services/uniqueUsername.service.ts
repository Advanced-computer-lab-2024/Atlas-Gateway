import { Types } from "mongoose";

import { Admin } from "../Database/Models/Users/admin.model";
import { Advertiser } from "../Database/Models/Users/advertiser.model";
import { Governor } from "../Database/Models/Users/governor.model";
import { Seller } from "../Database/Models/Users/seller.model";
import { TourGuide } from "../Database/Models/Users/tourGuide.model";
import { Tourist } from "../Database/Models/Users/tourist.model";

export default async function uniqueUn(username: string) {
	const adminUser = await Admin.find({ username });
	const advertiserUser = await Advertiser.find({ username });
	const governorUser = await Governor.find({ username });
	const sellerUser = await Seller.find({ username });
	const tourGuideUser = await TourGuide.find({ username });
	const touristUser = await Tourist.find({ username });

	console.log(adminUser.length);
	console.log(advertiserUser);
	console.log(governorUser);
	console.log(sellerUser);
	console.log(tourGuideUser);
	console.log(touristUser);
	if (
		adminUser.length == 0 &&
		advertiserUser.length == 0 &&
		governorUser.length == 0 &&
		sellerUser.length == 0 &&
		tourGuideUser.length == 0 &&
		touristUser.length == 0
	) {
		return true;
	}
	return false;
}
