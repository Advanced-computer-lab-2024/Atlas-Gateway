import { EAccountType } from "@/types/enums";
import {
	TAdmin,
	TAdvetisor,
	TGovernor,
	TSeller,
	TTourGuide,
	TTourist,
	TTransportationAdvetisor,
	TUser,
} from "@/types/global";

export type TRegisterationResponse = TUser & { _id: string };

export type TTouristProfileResponse = TTourist & {
	_id: string;
	isDeleted?: boolean;
};

export type TSellerProfileResponse = TSeller & {
	_id: string;
	isVerified?: boolean;
	isDeleted?: boolean;
};

export type TAdminResponse = TAdmin & {
	_id: string;
};

export type TGovernorProfileResponse = TGovernor & {
	_id: string;
};

export type TGovernorResponse = TGovernor & {
	_id: string;
};

export type TAdvertiserProfileResponse = TAdvetisor & {
	_id: string;
	isVerified?: boolean;
	isDeleted?: boolean;
};

export type TTransportationAdvertiserProfileResponse =
	TTransportationAdvetisor & {
		_id: string;
		isVerified?: boolean;
	};

export type TTourGuideProfileResponse = TTourGuide & {
	_id: string;
	isVerified?: boolean;
	isDeleted?: boolean;
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
