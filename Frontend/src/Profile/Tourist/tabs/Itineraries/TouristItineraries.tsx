import { formatDate } from "date-fns";
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

export default function TouristItineraries() {
	const { data, refetch } = useTouristProfile();
	const convertCurrency = useCurrency();

	return (
		<Table className="shadow-lg h-full">
			<TableHeader>
				<TableRow>
					<TableHead className="p-3">Title</TableHead>
					<TableHead className="p-3">Price</TableHead>
					<TableHead className="p-3">Start Date</TableHead>
					<TableHead className="p-3">End Date</TableHead>
					<TableHead className="p-3">Rating</TableHead>
					<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
						<RotateCw onClick={() => refetch()} />
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.bookedItineraries?.map((itinerary) => (
					<TableRow key={itinerary._id} className="cursor-pointer">
						<TableCell>{itinerary.title}</TableCell>
						<TableCell>
							{convertCurrency(itinerary.price)}
						</TableCell>
						<TableCell>
							{formatDate(
								new Date(itinerary.startDateTime || "0"),
								"dd/MM/yyyy HH:mm:ss a",
							)}
						</TableCell>
						<TableCell>
							{formatDate(
								new Date(itinerary.endDateTime || "0"),
								"dd/MM/yyyy HH:mm:ss a",
							)}
						</TableCell>
						<TableCell>{itinerary.avgRating}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
