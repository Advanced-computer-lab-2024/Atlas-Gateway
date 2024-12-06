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
	ItineraryId: string;
	ItineraryName: string;
	numberOfBookings: number;
	totalSales: number;
};

export type TProductReportResponse = {
	ProductId: string;
	ProductName: string;
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

export type TReportRespone<T> = {
	data: [T];
	metaData: {
		totalSales: number;
		totalBookings: number;
	};
};

export type TAdminReportResponse2 = {
	data: {
		products: {
			data: [
				{
					ActivityId: "6735e6d838f7da3b5e52d36d";
					ActivityName: "Testwadawd";
				},
			];
			metaData: {
				totalSales: 0;
			};
		};
		itineraries: {
			data: [
				{
					itineraryId: "67322bb8b25e343d02e26385";
					itineraryName: "Nasser Test 1";
					numberOfBookings: 1;
					totalSales: 20;
				},
				{
					itineraryId: "673235c1ec9c3673201375ac";
					itineraryName: "Sprint 2 Test";
					numberOfBookings: 0;
					totalSales: 0;
				},
				{
					itineraryId: "67325fc5554f6ff72adcb0e6";
					itineraryName: "omar farouk";
					numberOfBookings: 2;
					totalSales: 22;
				},
				{
					itineraryId: "6735dc3c1ead0d91a9043bf9";
					itineraryName: "testing now";
					numberOfBookings: 2;
					totalSales: 44;
				},
				{
					itineraryId: "6735dcf51ead0d91a9043c86";
					itineraryName: "maspdasid";
					numberOfBookings: 0;
					totalSales: 0;
				},
				{
					itineraryId: "673e14e7ceead27792addc9d";
					itineraryName: "iyierw";
					numberOfBookings: 0;
					totalSales: 0;
				},
				{
					itineraryId: "67507c14f930bbf1e0b3b5fe";
					itineraryName: "Test1";
					numberOfBookings: 8;
					totalSales: 4000;
				},
			];
			metaData: {
				totalSales: 4086;
				totalBookings: 13;
			};
		};
		activities: {
			data: [
				{
					ActivityId: "673234baec9c367320137556";
					ActivityName: "Sprint 2 Test";
					numberOfBookings: 1;
					totalSales: 20;
				},
				{
					ActivityId: "67328fd1378a35f602bebac6";
					ActivityName: "Test Activity";
					numberOfBookings: 2;
					totalSales: 214;
				},
				{
					ActivityId: "6735e24e9f5cf5f7bccd496f";
					ActivityName: "12321313";
					numberOfBookings: 1;
					totalSales: 30;
				},
				{
					ActivityId: "6735ebee2d2c4c795072e3bb";
					ActivityName: "Test aweawdwa";
					numberOfBookings: 1;
					totalSales: 120;
				},
			];
			metaData: {
				totalSales: 384;
				totalBookings: 5;
			};
		};
	};
	metaData: {
		totalSales: 447;
		totalBookings: 18;
	};
};
