import ReactECharts from "echarts-for-react";

import { TProductReportResponse } from "@/api/service/types";

export default function ProductsChart(
	products: TProductReportResponse[] | undefined,
) {
	const productsChart = {
		title: {
			text: "Product Sales",
		},
		tooltip: {},
		legend: {
			data: ["Sales"],
		},
		xAxis: {
			data: products?.map((d: TProductReportResponse) => d.ProductName),
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "Sales",
				type: "bar",
				data: products?.map((d: TProductReportResponse) => d.ProductId),
			},
		],
	};

	return (
		<div>
			<ReactECharts option={productsChart} style={{}} />
		</div>
	);
}
