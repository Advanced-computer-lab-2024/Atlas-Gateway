import ReactECharts from "echarts-for-react";

import { TItineraryReportResponse, TReportRespone } from "@/api/service/types";

export default function ItinerariesChart(
	itineraries: TReportRespone<TItineraryReportResponse> | undefined,
) {
	const itinerariesChart = {
		title: {
			text: "Itinerary Sales",
		},
		tooltip: {},
		legend: {
			data: ["Sales"],
		},
		xAxis: {
			data: itineraries?.data?.map(
				(d: TItineraryReportResponse) => d.ItineraryName,
			),
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "Sales",
				type: "bar",
				data: itineraries?.data?.map(
					(d: TItineraryReportResponse) => d.totalSales,
				),
			},
		],
	};

	return (
		<div>
			<ReactECharts option={itinerariesChart} style={{}} />
		</div>
	);
}
