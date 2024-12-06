import ReactECharts from "echarts-for-react";

import { TActivityReportResponse } from "@/api/service/types";

export default function ActivitiesChart(
	activities: TActivityReportResponse[] | undefined,
) {
	const activitiesChart = {
		title: {
			text: "Activity Sales",
		},
		tooltip: {},
		legend: {
			data: ["Sales"],
		},
		xAxis: {
			data: activities?.map(
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
				data: activities?.map(
					(d: TActivityReportResponse) => d.totalSales,
				),
			},
		],
	};

	return (
		<div>
			<ReactECharts option={activitiesChart} style={{}} />
		</div>
	);
}
