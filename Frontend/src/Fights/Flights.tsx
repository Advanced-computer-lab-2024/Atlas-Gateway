import { useState } from "react";

import { Flex } from "@/components/ui/flex";

import { IFlight } from "../../../Backend/src/Models/Flight/flight.model";
import FlightsCard from "./FlightsCard";
import SearchForm from "./Form/SearchForm";

const Flights = () => {
	const [flights, setFlights] = useState<IFlight[]>([]);

	const addFlight = (newFlight: IFlight) => {
		setFlights((prevFlights) => [...prevFlights, newFlight]);
	};
	const removeFlights = () => {
		setFlights([]);
	};
	return (
		<Flex isColumn gap="4" className="w-full h-full">
			<div className="self-center">
				<SearchForm
					addFlight={addFlight}
					removeFlights={removeFlights}
				/>
			</div>
			<Flex
				className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
				gap="4"
			>
				{flights.map((flight, index) => (
					<FlightsCard key={index} {...flight} />
				))}
			</Flex>
		</Flex>
	);
};

export default Flights;
