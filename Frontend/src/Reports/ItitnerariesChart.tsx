import ReactECharts from "echarts-for-react";

import { TItineraryReportResponse, TReportRespone } from "@/api/service/types";

export default function ItinerariesChart(
	props: TReportRespone<TItineraryReportResponse> | undefined,
) {
	const { data, metaData } = props || {};
	const itinerariesChart = {
		title: {
			text: `Itinerary Sales and Bookings\nTotal Sales: ${metaData?.totalSales ?? 0}, Total Bookings: ${metaData?.totalBookings ?? 0}`,
			left: "center",
			textStyle: {
				fontSize: 14,
			},
		},
		tooltip: {
			trigger: "axis",
		},
		legend: {
			data: ["Sales", "Bookings"],
			top: "10%",
		},
		xAxis: {
			type: "category",
			data: data?.map((d: TItineraryReportResponse) => d.itineraryName),
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "Sales",
				type: "bar",
				data: data?.map((d: TItineraryReportResponse) => d.totalSales),
				label: {
					show: true,
					position: "top",
					formatter: "{c}",
				},
			},
			{
				name: "Bookings",
				type: "bar",
				data: data?.map(
					(d: TItineraryReportResponse) => d.numberOfBookings,
				),
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
			option={itinerariesChart}
			style={{
				height: "500px",
				width: "80%",
			}}
		/>
	);
}
