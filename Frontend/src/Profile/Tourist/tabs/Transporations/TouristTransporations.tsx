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

export default function TouristTransportations() {
	const { data, refetch } = useTouristProfile();
	const convertCurrency = useCurrency();

	return (
		<Table className="shadow-lg h-full">
			<TableHeader>
				<TableRow>
					<TableHead className="p-3">Name</TableHead>
					<TableHead className="p-3">Price</TableHead>
					<TableHead className="p-3">Pickup time</TableHead>
					<TableHead className="p-3">Pickup location</TableHead>
					<TableHead className="p-3">Dropoff time</TableHead>
					<TableHead className="p-3">Dropoff location</TableHead>
					<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
						<RotateCw onClick={() => refetch()} />
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.bookedTransportations?.map((transportation) => (
					<TableRow
						key={transportation._id}
						className="cursor-pointer"
					>
						<TableCell>{transportation.name}</TableCell>
						<TableCell>
							{convertCurrency(transportation.price)}
						</TableCell>
						<TableCell>
							{formatDate(
								new Date(transportation.pickUpTime || "0"),
								"dd/MM/yyyy HH:mm:ss a",
							)}
						</TableCell>
						<TableCell>{transportation.pickUpLocation}</TableCell>
						<TableCell>
							{formatDate(
								new Date(transportation.dropOffTime || "0"),
								"dd/MM/yyyy HH:mm:ss a",
							)}
						</TableCell>
						<TableCell>{transportation.dropOffLocation}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
