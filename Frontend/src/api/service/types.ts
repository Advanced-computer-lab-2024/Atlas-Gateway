import { EAccountType } from "@/types/enums";
import {
	TAdvetisor,
	TSeller,
	TTourGuide,
	TTourist,
	TUser,
} from "@/types/global";

export type TRegisterationResponse = TUser & { _id: string };

export type TTouristProfileResponse = TTourist & { _id: string };

export type TSellerProfileResponse = TSeller & {
	_id: string;
	isVerified?: boolean;
};

export type TAdvertiserProfileResponse = TAdvetisor & {
	_id: string;
	isVerified?: boolean;
};

export type TTourGuideProfileResponse = TTourGuide & {
	_id: string;
	isVerified?: boolean;
};

export type TApiResponse<T> = {
	data: [T];
	metaData: {
		page: number;
		total: number;
		pages: number;
	};
};

export type TLoginResponse = {
	user: TUser;
	type: EAccountType;
};
