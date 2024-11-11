import { Label } from "@radix-ui/react-dropdown-menu";
import { formatDate } from "date-fns";
import { Calendar, Timer } from "lucide-react";

import { useBookhotel } from "@/api/data/useHotels";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import { citycodes } from "@/types/consts";
import { THotels } from "@/types/global";

import { IHotelBooking } from "../../../Backend/src/Models/Hotel/hotel.model";

const HotelsCard = (hotel: THotels) => {
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
			<Flex className="mt-3">
				<Button
					onClick={() => bookHotel()}
					className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition duration-200 ease-in-out"
				>
					Book Hotel
				</Button>
			</Flex>
		</Card>
	);
};

export default HotelsCard;
