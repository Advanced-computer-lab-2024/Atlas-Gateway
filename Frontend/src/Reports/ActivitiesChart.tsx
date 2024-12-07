import ReactECharts from "echarts-for-react";

import { TActivityReportResponse, TReportRespone } from "@/api/service/types";

export default function ActivitiesChart(
	props: TReportRespone<TActivityReportResponse> | undefined,
) {
	const { data, metaData } = props || {};
	const activityChart = {
		title: {
			text: `Activity Sales and Bookings\nTotal Sales: ${metaData?.totalSales ?? 0}, Total Bookings: ${metaData?.totalBookings ?? 0}`,
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
			data: data?.map((d: TActivityReportResponse) => d.ActivityName),
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "Sales",
				type: "bar",
				data: data?.map((d: TActivityReportResponse) => d.totalSales),
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
					(d: TActivityReportResponse) => d.numberOfBookings,
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
			option={activityChart}
			style={{
				height: "500px",
				width: "80%",
			}}
		/>
	);
}
