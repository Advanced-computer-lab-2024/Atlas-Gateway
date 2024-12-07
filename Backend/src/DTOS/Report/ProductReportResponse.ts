export interface IProductDTO {
	ProductId: string;
	ProductName: string;
}

export interface IProductReportResponse {
	data: IProductDTO[];
	metaData: {
		totalSales: number;
		totalBookings: number;
	};
}
