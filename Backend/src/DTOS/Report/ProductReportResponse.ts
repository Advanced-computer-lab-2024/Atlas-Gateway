export interface IProductDTO {
	ProductId: string;
	ProductName: string;
	quantity: number;
	sales: number;
}

export interface IProductReportResponse {
	data: IProductDTO[];
	metaData: {
		totalSales: number;
		totalBookings: number;
	};
}
