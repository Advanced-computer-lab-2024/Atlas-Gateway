import { IActivityReportResponse } from "./ActivityReportResponse";
import { IItineraryReportResponse } from "./ItineraryReportResponse";
import { IProductReportResponse } from "./ProductReportResponse";

export interface IAdminReportResponse {
	data: {
		products: IProductReportResponse;
		activities: IActivityReportResponse;
		itineraries: IItineraryReportResponse;
	};
	metaData: {
		totalSales: number;
		totalBookings: number;
	};
}
