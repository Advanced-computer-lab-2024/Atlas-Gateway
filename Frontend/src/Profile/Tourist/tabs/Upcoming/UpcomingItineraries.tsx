import axios from "axios";
import { formatDate } from "date-fns";
import { Eye, EyeOff, RotateCw } from "lucide-react";
import { useEffect } from "react";

import { useUpcomingItineraries } from "@/api/data/useItineraries";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import useCurrency from "@/hooks/useCurrency";
import { TItinerary } from "@/types/global";

function UpcomingItineraries() {
	const convertCurrency = useCurrency();
	const { data, refetch: refetchUpcoming } = useUpcomingItineraries();
	return (
		<Table className="shadow-lg h-full">
			<TableHeader>
				<TableRow>
					<TableHead className="p-3">Title</TableHead>
					<TableHead className="p-3">start Date Time</TableHead>
					<TableHead className="p-3">end Date Time</TableHead>
					<TableHead className="p-3">pick Up Location</TableHead>
					<TableHead className="p-3">drop Off Location</TableHead>
					<TableHead className="p-3">price</TableHead>
					<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
						<RotateCw onClick={() => refetchUpcoming()} />
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((itinerary: TItinerary) => (
					<TableRow key={itinerary._id} className="cursor-pointer">
						<TableCell>{itinerary.title}</TableCell>
						<TableCell>{itinerary.startDateTime}</TableCell>
						<TableCell>{itinerary.endDateTime}</TableCell>
						<TableCell>{itinerary.pickUpLocation}</TableCell>
						<TableCell>{itinerary.dropOffLocation}</TableCell>
						<TableCell>
							{convertCurrency(itinerary.price)}
						</TableCell>
						<TableCell>
							{itinerary._id ? (
								<Eye
									onClick={() => {
										window.location.href = `/itineraries/${itinerary._id}`;
									}}
									className="cursor-pointer hover:text-[#2b58ed]"
								/>
							) : (
								<EyeOff />
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

export default UpcomingItineraries;
