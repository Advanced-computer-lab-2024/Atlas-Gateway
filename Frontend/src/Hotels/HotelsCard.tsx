import { EllipsisVertical, Eye } from "lucide-react";

import Label from "@/components/ui/Label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flex } from "@/components/ui/flex";
import { THotel } from "@/types/global";

import hotel1 from "../assets/hotel1.jpeg";
import hotel2 from "../assets/hotel2.jpeg";
import hotel3 from "../assets/hotel3.jpg";
import hotel4 from "../assets/hotel4.jpeg";
import hotel5 from "../assets/hotel5.jpeg";

const HotelsCard = ({
	hotel,
	openEditDrawer,
}: {
	hotel: THotel;
	openEditDrawer: (hotel: THotel) => void;
}) => {
	const images = [hotel1, hotel2, hotel3, hotel4, hotel5];
	const randomImage = Math.floor(Math.random() * 5);

	return (
		<Card className="w-full h-[280px] flex gap-2 flex-col border-black border-2 font-bold text-xl">
			<CardHeader>
				<Flex justify="between">
					<Label.Mid500>{hotel.name}</Label.Mid500>
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger className="bg-transparent">
							<EllipsisVertical className="cursor-pointer" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								className="flex gap-2 cursor-pointer"
								onClick={() => {
									openEditDrawer(hotel);
								}}
							>
								<Eye />
								View Details
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</Flex>
			</CardHeader>
			<img
				src={images[randomImage]}
				alt={`${hotel.name} image`}
				className="w-full h-[100px] object-cover"
			/>
			<CardContent>
				<Flex gap="3" justify="between">
					<Flex isColumn gap="2">
						<Label.Mid300>Chain code</Label.Mid300>
						<Label.Mid500>{hotel.chainCode}</Label.Mid500>
					</Flex>
					<Flex isColumn gap="2">
						<Label.Mid300>Hotel ID</Label.Mid300>
						<Label.Mid500>{hotel.hotelId}</Label.Mid500>
					</Flex>
				</Flex>
			</CardContent>
		</Card>
	);
};

export default HotelsCard;
