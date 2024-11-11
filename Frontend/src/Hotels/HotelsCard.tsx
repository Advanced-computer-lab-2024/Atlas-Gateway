import { Label } from "@radix-ui/react-dropdown-menu";
import { formatDate } from "date-fns";
import { Calendar, Timer } from "lucide-react";



import { useBookhotel } from "@/api/data/useHotels";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import { citycodes } from "@/types/consts";



import { IHotelBooking } from "../../../Backend/src/Models/Hotel/hotel.model";


const HotelsCard = (hotel: IHotelBooking) => {
	const { doBookHotel } = useBookhotel(() => {});
	const getcodeLabel = (value: string): string => {
		const code = citycodes.find((code) => code.value === value);
		return code ? code.label : "Not Found";
	};
	const bookHotel = () => {
		doBookHotel(hotel);
	};
	return (
		<Card className="w-full h-fit flex gap-2 flex-col border-black border-2 font-bold text-xl">
			<CardContent>
				<Flex isColumn gap="2">
					<Flex
						gap="5"
						align="center"
						justify="center"
						className="mt-5"
					>
						<h2>
							{getcodeLabel(hotel.hotel.chainCode)}
							{" - "}
							{hotel.hotel.name}
						</h2>
						<h2>
							{getcodeLabel(hotel.hotel.cityCode)}
							{" - "}
							{hotel.hotel.type}
						</h2>
					</Flex>
					<Flex align="center" justify="between">
						<Flex gap="1" align="center" className="text-base">
							<Calendar />
							<Label>
								{formatDate(
									new Date(hotel.offer[0].checkInDate),
									"yyyy-MM-dd",
								)}
							</Label>
						</Flex>
						<Flex gap="1" align="center" className="text-base">
							<Calendar />
							<Label>
								{formatDate(
									new Date(hotel.offer[0].checkOutDate),
									"yyyy-MM-dd",
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
						<Label>{hotel.offer[0]?.room?.type}</Label>
					</Flex>
				</Flex>

				{hotel.offer[0].guests && (
					<Flex isColumn gap="2">
						<Flex
							gap="5"
							align="center"
							justify="center"
							className="mt-5"
						>
							<h2>
								{hotel.offer[0].guests} Guests
							</h2>
						</Flex>
						<Flex
							gap="1"
							justify="center"
							align="center"
							className="text-base"
						>
							<Timer />
							<Label>{hotel.offer[0].policies.cancellations[0].description.text}</Label>
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
						<h2>{hotel.offer[0].policies.cancellations[0].type}</h2>
					</Flex>
					<Flex
						gap="5"
						align="center"
						justify="center"
						className="mt-5"
					>
						<h2>{hotel.offer[0].price.total} {" "}{hotel.offer[0].price.currency}</h2>
					</Flex>
				</Flex>
				<Flex className="mt-3">
					<Button
						onClick={() => bookHotel()}
						className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition duration-200 ease-in-out"
					>
						Book Hotel
					</Button>
				</Flex>
			</CardFooter>
		</Card>
	);
};

export default HotelsCard;