export interface IItineraryDTO {
	itineraryId: string;
	itineraryName: string;
	numberOfBookings: number;
	totalSales: number;
}

export interface IItineraryReportResponse {
	data: IItineraryDTO[];
	metaData: {
		totalSales: number;
		totalBookings: number;
	};
}
