import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import React, { FC, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// Configure Leaflet default icon URLs
L.Icon.Default.mergeOptions({
	iconRetinaUrl: new URL(
		"leaflet/dist/images/marker-icon-2x.png",
		import.meta.url,
	).toString(),
	iconUrl: new URL(
		"leaflet/dist/images/marker-icon.png",
		import.meta.url,
	).toString(),
	shadowUrl: new URL(
		"leaflet/dist/images/marker-shadow.png",
		import.meta.url,
	).toString(),
});

// Type definition for location
type Location = {
	lat: number;
	lon: number;
	display_name: string;
};

// Type definition for Overpass API response elements
type OverpassElement = {
	lat?: number; // latitude may not exist for ways
	lon?: number; // longitude may not exist for ways
	center?: {
		lat: number;
		lon: number;
	};
	tags?: {
		name?: string; // name can be optional
	};
};

// Type definition for Overpass API response
type OverpassResponse = {
	elements: OverpassElement[];
};

// Function to search locations using Overpass API
const searchLocations = async (lat: number, lon: number) => {
	const offset = 2000; // Offset in meters

	const query = `
		[out:json];
		(
			node(around:${offset}, ${lat}, ${lon});
			way(around:${offset}, ${lat}, ${lon});
		);
		out body;
	`;

	const response = await fetch(
		`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
	);
	return response;
};

// Main Map component
function Map({ setLocation }: { setLocation: (location: string) => void }) {
	const initialPosition = { lat: 30.0444, lng: 31.2357 }; // Default center position
	const [locations, setLocations] = useState<Location[]>([]);
	const [loading, setLoading] = useState(true);
	const [position, setPosition] = useState(initialPosition); // Manage position in state

	useEffect(() => {
		// Fetch locations from Overpass API
		const fetchLocations = async () => {
			setLoading(true);
			const response = await searchLocations(position.lat, position.lng);
			const data: OverpassResponse = await response.json(); // Specify the type of the response data

			// Process the response data and filter out locations without a name
			const allLocations = data.elements
				.map((element) => ({
					lat: element.lat || element.center?.lat || 0, // Default to 0 if no lat
					lon: element.lon || element.center?.lon || 0, // Default to 0 if no lon
					display_name: element.tags?.name || "", // Default name to an empty string
				}))
				.filter((location) => location.display_name); // Only keep locations with a name

			setLocations(allLocations);
			setLoading(false);
		};

		fetchLocations();
	}, [position]); // Refetch when position changes

	const MapEvents = () => {
		const map = useMap();
		useEffect(() => {
			const handleMoveEnd = () => {
				const center = map.getCenter(); // Get the center of the map
				setPosition({ lat: center.lat, lng: center.lng }); // Update position state
			};

			map.on("moveend", handleMoveEnd); // Update position on move end

			return () => {
				map.off("moveend", handleMoveEnd); // Cleanup listener on unmount
			};
		}, [map]);

		return null;
	};

	const handleMarkerClick = (name: string) => {
		setLocation(name); // Set location in parent component
		return; // Replace with your desired function logic
	};

	return (
		<div>
			<MapContainer
				center={initialPosition}
				zoom={13}
				scrollWheelZoom={true}
				style={{ height: "400px", width: "100%" }}
			>
				<MapEvents />
				{/* Adding a TileLayer */}
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{/* Handle map events */}
				{locations.map((location, idx) => (
					<Marker
						key={idx}
						position={[location.lat, location.lon]}
						eventHandlers={{
							click: () =>
								handleMarkerClick(location.display_name), // Call function on marker click
						}}
					>
						<Popup>{location.display_name}</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}

export default Map;
