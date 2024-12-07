import { EAccountType } from "@/types/enums";
import {
	TAdmin,
	TAdvetisor,
	TGovernor,
	TSeller,
	TTourGuide,
	TTourist,
	TTransportationAdvertiser,
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
	TTransportationAdvertiser & {
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
export type TUserStatisticsResponse = {
	total: number; // Total number of users
	newTotal: number; // Number of new users last month
};

export type TActivityReportResponse = {
	ActivityId: string;
	ActivityName: string;
	numberOfBookings: number;
	totalSales: number;
};

export type TItineraryReportResponse = {
	itineraryId: string;
	itineraryName: string;
	numberOfBookings: number;
	totalSales: number;
};

export type TProductReportResponse = {
	ProductId: string;
	ProductName: string;
};

export type TReportRespone<T> = {
	data: T[];
	metaData: {
		totalSales: number;
		totalBookings: number;
	};
};

export type TAdminReportResponse = {
	data: {
		products: TReportRespone<TProductReportResponse>;
		activities: TReportRespone<TActivityReportResponse>;
		itineraries: TReportRespone<TItineraryReportResponse>;
	};
	metaData: {
		totalSales: number;
		totalBookings: number;
	};
};
