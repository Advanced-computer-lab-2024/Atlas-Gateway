import { Label } from "@radix-ui/react-dropdown-menu";
import { formatDate } from "date-fns";
import { ArrowRight, Calendar, Timer } from "lucide-react";

import { useBookFlight } from "@/api/data/useFlights";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import { locations } from "@/types/consts";

import { IFlight } from "../../../Backend/src/Models/Flight/flight.model";

const FlightsCard = (flight: IFlight) => {
	const { doBookFlight } = useBookFlight(() => {});
	const getLocationLabel = (value: string): string => {
		const location = locations.find((location) => location.value === value);
		return location ? location.label : "Not Found";
	};
	const bookFlight = () => {
		doBookFlight(flight);
	};
	return (
		<Card className="w-full h-fit flex gap-2 flex-col border-black border-2 font-bold text-xl">
			<Flex align="center" justify="center" className="mt-3">
				<h2>{flight.ticketType.toUpperCase()}</h2>
			</Flex>

			<CardContent>
				<Flex isColumn gap="2">
					<Flex
						gap="5"
						align="center"
						justify="center"
						className="mt-5"
					>
						<h2>
							{getLocationLabel(flight.departure.from)}
							{" - "}
							{flight.departure.from}
						</h2>
						<ArrowRight />
						<h2>
							{getLocationLabel(flight.departure.to)}
							{" - "}
							{flight.departure.to}
						</h2>
					</Flex>
					<Flex align="center" justify="between">
						<Flex gap="1" align="center" className="text-base">
							<Calendar />
							<Label>
								{formatDate(
									new Date(flight.departure.departureTime),
									"dd/MM/yyyy HH:mm:ss a",
								)}
							</Label>
						</Flex>
						<Flex gap="1" align="center" className="text-base">
							<Calendar />
							<Label>
								{formatDate(
									new Date(flight.departure.arrivalTime),
									"dd/MM/yyyy HH:mm:ss a",
								)}
							</Label>
						</Flex>
					</Flex>
					<Flex
						gap="1"
						justify="center"
						align="center"
						className="text-base"
					>
						<Timer />
						<Label>{flight.departure.duration}</Label>
					</Flex>
				</Flex>

				{flight.returnTrip && (
					<Flex isColumn gap="2">
						<Flex
							gap="5"
							align="center"
							justify="center"
							className="mt-5"
						>
							<h2>
								{getLocationLabel(flight.returnTrip.from)}
								{" - "}
								{flight.returnTrip.from}
							</h2>
							<ArrowRight />
							<h2>
								{getLocationLabel(flight.returnTrip.to)}
								{" - "}
								{flight.returnTrip.to}
							</h2>
						</Flex>
						<Flex align="center" justify="between">
							<Flex gap="1" align="center" className="text-base">
								<Calendar />
								<Label>
									{formatDate(
										new Date(
											flight.returnTrip.departureTime,
										),
										"dd/MM/yyyy HH:mm:ss a",
									)}
								</Label>
							</Flex>
							<Flex gap="1" align="center" className="text-base">
								<Calendar />
								<Label>
									{formatDate(
										new Date(flight.returnTrip.arrivalTime),
										"dd/MM/yyyy HH:mm:ss a",
									)}
								</Label>
							</Flex>
						</Flex>
						<Flex
							gap="1"
							justify="center"
							align="center"
							className="text-base"
						>
							<Timer />
							<Label>{flight.returnTrip.duration}</Label>
						</Flex>
					</Flex>
				)}
			</CardContent>
			<CardFooter className="flex flex-col">
				<Flex justify="between" align="center" className="w-full">
					<Flex
						gap="5"
						align="center"
						justify="center"
						className="mt-5"
					>
						<h2>Class: {flight.travelClass}</h2>
					</Flex>
					<Flex
						gap="5"
						align="center"
						justify="center"
						className="mt-5"
					>
						<h2>{flight.price} EGP</h2>
					</Flex>
				</Flex>
				<Flex className="mt-3">
					<Button
						onClick={() => bookFlight()}
						className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition duration-200 ease-in-out"
					>
						Book Flight
					</Button>
				</Flex>
			</CardFooter>
		</Card>
	);
};

export default FlightsCard;
