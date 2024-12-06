import ReactECharts from "echarts-for-react";

import { TItineraryReportResponse, TReportRespone } from "@/api/service/types";

export default function ItinerariesChart(
	itineraries: TReportRespone<TItineraryReportResponse> | undefined,
) {
	console.log(itineraries);
	console.log(itineraries?.itineraries?.data);
	const itinerariesChart = {
		title: {
			text: "Itinerary Sales",
		},
		tooltip: {},
		legend: {
			data: ["Sales"],
		},
		xAxis: {
			type: "category",
			data: itineraries?.itineraries?.data?.map(
				(d: TItineraryReportResponse) => d.itineraryName,
			),
		},
		yAxis: {
			type: "value",
			data: itineraries?.itineraries?.data?.map(
				(d: TItineraryReportResponse) => d.totalSales,
			),
		},
		series: [
			{
				name: "Sales",
				type: "bar",
				data: itineraries?.itineraries?.data?.map(
					(d: TItineraryReportResponse) => d.totalSales,
				),
			},
		],
	};

	return (
		<ReactECharts
			option={itinerariesChart}
			style={{
				height: "500px",
				width: "500px",
			}}
		/>
	);
}
