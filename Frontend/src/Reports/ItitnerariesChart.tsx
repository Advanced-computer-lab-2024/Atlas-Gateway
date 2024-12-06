import ReactECharts from "echarts-for-react";

import { TItineraryReportResponse } from "@/api/service/types";

export default function ItinerariesChart(
	itineraries: TItineraryReportResponse[] | undefined,
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
			data: itineraries?.map(
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
				data: itineraries?.map(
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
