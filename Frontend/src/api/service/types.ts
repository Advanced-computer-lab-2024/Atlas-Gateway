import { TAdvetisor, TSeller, TTourGuide, TTourist, TUser } from "@/types/global";


export type TRegisterationResponse = TUser & { _id: string };

export type TLoginResponse = TUser & { _id: string };

export type TTouristProfileResponse = TTourist & { _id: string };

export type TSellerProfileResponse = TSeller & { _id: string };

export type TAdvertiserProfileResponse = TAdvetisor & { _id: string };

export type TTourGuideProfileResponse = TTourGuide & { _id: string };

export type TApiResponse<T> = {
	data: T;
	metaData: {
		page: number;
		total: number;
		pages: number;
	};
};