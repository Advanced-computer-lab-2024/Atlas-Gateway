import ReactECharts from "echarts-for-react";
import React, { useState } from "react";

import { TItineraryReportResponse, TReportRespone } from "@/api/service/types";
import { Button } from "@/components/ui/button";

export default function ItinerariesChart(
	props: TReportRespone<TItineraryReportResponse> | undefined,
) {
	const { data, metaData } = props || {};
	const [zoomedItinerary, setZoomedItinerary] = useState<string | null>(null); // Track zoomed itinerary

	// Filter data for zoomed view
	const filteredData = zoomedItinerary
		? data?.filter((d) => d.itineraryName === zoomedItinerary)
		: data;

	const chartOptions = {
		title: {
			text: zoomedItinerary
				? `Zoomed View: ${zoomedItinerary}`
				: "Itinerary Sales and Bookings",
			subtext: zoomedItinerary
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
				(d: TItineraryReportResponse) => d.itineraryName,
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
					(d: TItineraryReportResponse) => d.totalSales,
				),
				itemStyle: {
					color: "#1abc9c", // Custom green color for Sales
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
					(d: TItineraryReportResponse) => d.numberOfBookings,
				),
				itemStyle: {
					color: "#3498db", // Custom blue color for Bookings
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
		dataZoom: zoomedItinerary
			? [] // Disable slider in zoomed view
			: [
					{
						type: "slider", // Slider for zooming
						start: 0,
						end: 100,
						height: 20,
						bottom: 10,
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
			setZoomedItinerary(params.name); // Set zoomed itinerary
		}
	};

	// Handle zoom-out
	const handleZoomOut = () => {
		setZoomedItinerary(null); // Reset zoom
	};

	return (
		<div
			className="w-full h-full 
			flex flex-col items-center
			shadow-md rounded-lg bg-white p-20
			mt-10 mb-10 ms-10 me-10"
		>
			{zoomedItinerary && (
				<Button
					onClick={handleZoomOut}
					className="mb-2 p-5 cursor-pointer"
				>
					Back to Overview
				</Button>
			)}
			<ReactECharts
				option={chartOptions}
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
