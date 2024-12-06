import ReactECharts from "echarts-for-react";

import { TActivityReportResponse, TReportRespone } from "@/api/service/types";

export default function ActivitiesChart(
	activities: TReportRespone<TActivityReportResponse> | undefined,
) {
	console.log(activities);
	const activitiesChart = {
		title: {
			text: "Activity Sales",
		},
		tooltip: {},
		legend: {
			data: ["Sales"],
		},
		xAxis: {
			data: activities?.data?.map(
				(d: TActivityReportResponse) => d.ActivityName,
			),
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "Sales",
				type: "bar",
				data: activities?.data?.map(
					(d: TActivityReportResponse) => d.totalSales,
				),
			},
		],
	};

	return (
		<div>
			<ReactECharts
				option={activitiesChart}
				style={{
					height: "500px",
					width: "100%",
				}}
			/>
		</div>
	);
}
