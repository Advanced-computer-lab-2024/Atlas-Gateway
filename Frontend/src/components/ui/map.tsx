import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

type OverpassElement = {
	lat?: number;
	lon?: number;
	center?: {
		lat: number;
		lon: number;
	};
	tags?: {
		name?: string;
	};
};

type OverpassResponse = {
	elements: OverpassElement[];
};

const searchLocations = async (lat: number, lon: number) => {
	const offset = 2000;

	const query = `
		[out:json];
		(
			node(around:${offset}, ${lat}, ${lon})["name"];
		);
		out body;
	`;

	const response = await fetch(
		`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
	);
	return response;
};

const center = [30.0444, 31.2357]; // Cairo coordinates

function Map({ setLocation }: { setLocation: (location: string) => void }) {
	const [locations, setLocations] = useState<OverpassElement[]>([]);
	const [position, setPosition] = useState({ lat: 30.0444, lng: 31.2357 });

	const fetchLocations = async () => {
		const response = await searchLocations(position.lat, position.lng);
		const data: OverpassResponse = await response.json();

		setLocations(data.elements);
	};

	const MapEvents = () => {
		const map = useMap();
		useEffect(() => {
			const handleMoveEnd = () => {
				const center = map.getCenter();
				setPosition({ lat: center.lat, lng: center.lng });
				fetchLocations();
			};

			map.on("moveend", handleMoveEnd);

			return () => {
				map.off("moveend", handleMoveEnd);
			};
		}, [map]);

		return null;
	};

	const handleMarkerClick = (name: string) => {
		setLocation(name);
	};

	return (
		<div>
			<MapContainer
				zoom={13}
				center={center}
				scrollWheelZoom={true}
				style={{
					height: "400px",
					width: "100%",
				}}
			>
				<MapEvents />
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				{locations.map((location, idx) => (
					<Marker
						key={idx}
						position={[location.lat, location.lon]}
						eventHandlers={{
							click: () =>
								handleMarkerClick(location?.tags?.name || ""),
						}}
					>
						<Popup>{location?.tags?.name}</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}

export default Map;
