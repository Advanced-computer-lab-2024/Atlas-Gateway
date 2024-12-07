import ReactECharts from "echarts-for-react";

import { TProductReportResponse, TReportRespone } from "@/api/service/types";

export default function ProductsChart(
	props: TReportRespone<TProductReportResponse> | undefined,
) {
	const { data, metaData } = props || {};
	const productsChart = {
		title: {
			text: `Products Sales\nTotal Sales: ${metaData?.totalSales ?? 0}`,
			left: "center",
			textStyle: {
				fontSize: 14,
			},
		},
		tooltip: {
			trigger: "axis",
		},
		legend: {
			data: ["Sales"],
			top: "10%",
		},
		xAxis: {
			type: "category",
			data: data?.map((d: TProductReportResponse) => d.ProductName),
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "Sales",
				type: "bar",
				data: data?.map((d: TProductReportResponse) => d.ProductId),
				label: {
					show: true,
					position: "top",
					formatter: "{c}",
				},
			},
		],
	};

	return (
		<ReactECharts
			option={productsChart}
			style={{
				height: "500px",
				width: "80%",
			}}
		/>
	);
}
