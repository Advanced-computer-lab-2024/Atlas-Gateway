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

const HotelsCard = ({
	hotel,
	openEditDrawer,
}: {
	hotel: THotel;
	openEditDrawer: (hotel: string) => void;
}) => {
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
									openEditDrawer(hotel.hotelId);
								}}
							>
								<Eye />
								View Details
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</Flex>
			</CardHeader>
			<CardContent>
				<Flex isColumn gap="3">
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
