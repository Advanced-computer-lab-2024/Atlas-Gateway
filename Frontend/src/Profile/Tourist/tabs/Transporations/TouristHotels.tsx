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

export default function TouristHotels() {
	const { data, refetch } = useTouristProfile();
	const convertCurrency = useCurrency();

	return (
		<Table className="shadow-lg h-full">
			<TableHeader>
				<TableRow>
					<TableHead className="p-3">Hotel</TableHead>
					<TableHead className="p-3">Check in date</TableHead>
					<TableHead className="p-3">Check out date</TableHead>
					<TableHead className="p-3">Price</TableHead>
					<TableHead className="p-3">Room description</TableHead>
					<TableHead className="cursor-pointer hover:text-[#2b58ed] w-1">
						<RotateCw onClick={() => refetch()} />
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.bookedHotelOffers?.map((hotelOffer) => (
					<TableRow
						key={hotelOffer.offer.id}
						className="cursor-pointer"
					>
						<TableCell>{hotelOffer.hotel.name}</TableCell>
						<TableCell>
							{format(
								new Date(hotelOffer.offer.checkInDate),
								"dd/MM/yyyy HH:mm:ss a",
							)}
						</TableCell>
						<TableCell>
							{format(
								new Date(hotelOffer.offer.checkOutDate),
								"dd/MM/yyyy HH:mm:ss a",
							)}
						</TableCell>
						<TableCell>
							{convertCurrency(
								+hotelOffer.offer.price.total,
								hotelOffer.offer.price.currency,
							)}
						</TableCell>
						<TableCell>
							{hotelOffer.offer.room.description.text.substring(
								0,
								100,
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
