import { format } from "date-fns";
import { RotateCw } from "lucide-react";

import { useTouristProfile } from "@/api/data/useProfile";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import useCurrency from "@/hooks/useCurrency";
import { useLoginStore } from "@/store/loginStore";
import { locations } from "@/types/consts";

const TouristFlights = () => {
	const { data, refetch } = useTouristProfile();
	const { user } = useLoginStore();
	const convertCurrency = useCurrency();
	const getLocationLabel = (value: string): string => {
		const location = locations.find((location) => location.value === value);
		return location ? location.label : "Not Found";
	};

	return (
		<Table className="shadow-lg h-full">
			<TableHeader>
				<TableRow>
					<TableHead className="p-3">Ticket Type</TableHead>
					<TableHead className="p-3">Departure From</TableHead>
					<TableHead className="p-3">Departure To</TableHead>
					<TableHead className="p-3">TakeOff Time</TableHead>
					<TableHead className="p-3">Landing Time</TableHead>
					<TableHead className="p-3">Return From</TableHead>
					<TableHead className="p-3">Return To</TableHead>
					<TableHead className="p-3">TakeOff Time</TableHead>
					<TableHead className="p-3">Landing Time</TableHead>
					<TableHead className="p-3">Airline</TableHead>
					<TableHead className="p-3">Flight Number</TableHead>
					<TableHead className="p-3">Price</TableHead>
					<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
						<RotateCw onClick={() => refetch()} />
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.bookedFlights?.map((flight) => (
					<TableRow key={flight._id} className="cursor-pointer">
						<TableCell>{flight.ticketType}</TableCell>
						<TableCell>
							{getLocationLabel(flight.departure.from)}
						</TableCell>
						<TableCell>
							{getLocationLabel(flight.departure.to)}
						</TableCell>
						<TableCell>
							{format(
								new Date(flight.departure.departureTime),
								"dd/MM/yyyy HH:mm:ss a",
							)}
						</TableCell>
						<TableCell>
							{format(
								new Date(flight.departure.arrivalTime),
								"dd/MM/yyyy HH:mm:ss a",
							)}
						</TableCell>
						<TableCell>
							{flight.returnTrip
								? getLocationLabel(flight.returnTrip.from)
								: "-"}
						</TableCell>
						<TableCell>
							{flight.returnTrip
								? getLocationLabel(flight.returnTrip.to)
								: "-"}
						</TableCell>
						<TableCell>
							{flight.returnTrip
								? format(
										new Date(
											flight.returnTrip.departureTime,
										),
										"dd/MM/yyyy HH:mm:ss a",
									)
								: "-"}
						</TableCell>
						<TableCell>
							{flight.returnTrip
								? format(
										new Date(flight.returnTrip.arrivalTime),
										"dd/MM/yyyy HH:mm:ss a",
									)
								: "-"}
						</TableCell>
						<TableCell>{flight.departure.airLine}</TableCell>
						<TableCell>{flight.departure.flightNumber}</TableCell>
						<TableCell>
							{parseInt(convertCurrency(flight.price)).toFixed(2)}{" "}
							{user?.currency}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default TouristFlights;
