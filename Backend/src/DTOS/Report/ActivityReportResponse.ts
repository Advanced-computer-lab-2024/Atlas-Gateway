export interface IActivityDTO {
	ActivityId: string;
	ActivityName: string;
	numberOfBookings: number;
	totalSales: number;
}

export interface IActivityReportResponse {
	data: IActivityDTO[];
	metaData: {
		totalSales: number;
		totalBookings: number;
	};
}
