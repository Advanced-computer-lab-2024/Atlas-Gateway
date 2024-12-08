import ReactECharts from "echarts-for-react";
import { useState } from "react";

import {
	TReportRespone,
	TTransportationReportResponse,
} from "@/api/service/types";
import { Button } from "@/components/ui/button";

export default function TransportationChart(
	props: TReportRespone<TTransportationReportResponse> | undefined,
) {
	const { data, metaData } = props || {};
	const [zoomedActivity, setZoomedActivity] = useState<string | null>(null); // Track zoomed activity

	// Filter data for zoomed view
	const filteredData = zoomedActivity
		? data?.filter((d) => d.TransportationName === zoomedActivity)
		: data;

	const activityChartOptions = {
		title: {
			text: zoomedActivity
				? `Zoomed View: ${zoomedActivity}`
				: "Activity Sales and Bookings",
			subtext: zoomedActivity
				? ""
				: `Total Sales: ${metaData?.totalSales ?? 0}, Total Bookings: ${
						metaData?.totalBookings ?? 0
					}`,
			left: "center",
			textStyle: {
				fontSize: 18,
				fontWeight: "bold",
				color: "#2c3e50",
			},
			subtextStyle: {
				fontSize: 14,
				color: "#7f8c8d",
			},
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow", // Highlight bar and X-axis area together
			},
		},
		legend: {
			data: ["Sales", "Bookings"],
			top: "5%",
			right: "5%",
			textStyle: {
				fontSize: 12,
				color: "#34495e",
			},
		},
		grid: {
			top: "20%",
			left: "10%",
			right: "10%",
			bottom: "15%",
		},
		xAxis: {
			type: "category",
			data: filteredData?.map(
				(d: TTransportationReportResponse) => d.TransportationName,
			),
			axisLabel: {
				rotate: 45,
				fontSize: 12,
				color: "#34495e",
			},
			axisLine: {
				lineStyle: {
					color: "#bdc3c7",
				},
			},
		},
		yAxis: {
			type: "value",
			axisLabel: {
				fontSize: 12,
				color: "#34495e",
			},
			splitLine: {
				lineStyle: {
					type: "dashed",
					color: "#ecf0f1",
				},
			},
		},
		series: [
			{
				name: "Sales",
				type: "bar",
				data: filteredData?.map(
					(d: TTransportationReportResponse) => d.totalSales,
				),
				itemStyle: {
					color: "#e74c3c",
				},
				barWidth: "35%",
				label: {
					show: true,
					position: "top",
					formatter: "{c}",
					fontSize: 12,
					fontWeight: "bold",
					color: "#2c3e50",
				},
			},
			{
				name: "Bookings",
				type: "bar",
				data: filteredData?.map(
					(d: TTransportationReportResponse) => d.numberOfBookings,
				),
				itemStyle: {
					color: "#3498db",
				},
				barWidth: "35%",
				label: {
					show: true,
					position: "top",
					formatter: "{c}",
					fontSize: 12,
					fontWeight: "bold",
					color: "#2c3e50",
				},
			},
		],
		dataZoom: zoomedActivity
			? [] // Disable slider in zoomed view
			: [
					{
						type: "slider", // Add slider for zooming
						start: 0,
						end: 100,
						height: 20,
						bottom: 5,
						borderColor: "#ecf0f1",
						fillerColor: "rgba(52, 152, 219, 0.2)", // Custom slider color
						handleStyle: {
							color: "#3498db",
							borderColor: "#3498db",
						},
						textStyle: {
							color: "#34495e",
						},
					},
					{
						type: "inside", // Inside zoom with mouse/touch
					},
				],
	};

	// Handle clicks on bars or X-axis labels
	const handleChartClick = (params: any) => {
		if (
			params.componentType === "series" || // Bar click
			params.componentType === "xAxis" // X-axis label click
		) {
			setZoomedActivity(params.name); // Set zoomed activity
		}
	};

	// Handle zoom-out
	const handleZoomOut = () => {
		setZoomedActivity(null); // Reset zoom
	};

	return (
		<div className="w-full h-full flex flex-col items-center shadow-md rounded-lg bg-white p-20">
			{zoomedActivity && (
				<Button
					onClick={handleZoomOut}
					className="mb-2 p-5 cursor-pointer"
				>
					Back to Overview
				</Button>
			)}
			<ReactECharts
				option={activityChartOptions}
				style={{
					height: "500px",
					width: "90%",
				}}
				onEvents={{
					click: handleChartClick, // Add click handler for bars and X-axis
				}}
			/>
		</div>
	);
}
