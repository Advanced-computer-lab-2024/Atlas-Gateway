import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { formatDate } from "date-fns";
import { DollarSign, EllipsisVertical, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import { TItinerary } from "@/types/global";

export default function ItineraryCard({
	_id,
	availability,
	avgRating,
	dropOffLocation,
	startDateTime,
	endDateTime,
	numberOfBookings,
	pickUpLocation,
	price,
	tags,
	language,
	title,
}: TItinerary) {
	const navigate = useNavigate();

	return (
		<Card
			key={_id}
			className="w-full h-[350px] flex gap-1 flex-col border-surface-secondary border-2"
		>
			<CardContent className="p-2">
				<Flex isColumn gap="4" align="center">
					<Flex
						gap="2"
						align="center"
						justify="center"
						className="relative w-full"
					>
						<Label.Mid500 className="justify-self-center">
							{title}
						</Label.Mid500>
						<DropdownMenu>
							<DropdownMenuTrigger className="absolute right-0">
								<EllipsisVertical className="cursor-pointer" />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem
									onClick={() => {
										navigate(`/itineraries/${_id}`);
									}}
								>
									View Itinerary Details
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</Flex>
					<Flex gap="2" isColumn align="center">
						<Flex gap="2" align="center" justify="between">
							<Label.Thin200>Pickup:</Label.Thin200>
							<MapPin size={20} />
							<Label.Thin200 className="overflow-ellipsis">
								{pickUpLocation}
							</Label.Thin200>
						</Flex>
						<Flex gap="2" align="center" justify="between">
							<Label.Thin200>Dropoff:</Label.Thin200>
							<MapPin size={20} />
							<Label.Thin200 className="overflow-ellipsis">
								{dropOffLocation}
							</Label.Thin200>
						</Flex>
						<Flex gap="2" align="center" justify="between">
							<Label.Thin200>
								{startDateTime &&
									formatDate(
										new Date(startDateTime),
										"dd/MM/yyyy HH:mm:ss a",
									)}
							</Label.Thin200>
							<Label.Thin200>To</Label.Thin200>
							<Label.Thin200 className="overflow-ellipsis">
								{endDateTime &&
									formatDate(
										new Date(endDateTime),
										"dd/MM/yyyy HH:mm:ss a",
									)}
							</Label.Thin200>
						</Flex>
						<Label.Mid200 className="overflow-ellipsis"></Label.Mid200>
					</Flex>
					<Flex className="w-full" align="center" justify="between">
						<Flex gap="1" align="center">
							<DollarSign size={20} />
							<Label.Thin300 className="overflow-ellipsis">
								{price}
							</Label.Thin300>
						</Flex>
						<Flex gap="1" align="center">
							<Star color="yellow" fill="yellow" size={20} />
							<Label.Thin300 className="overflow-ellipsis">
								{avgRating ?? "N/A"}
							</Label.Thin300>
						</Flex>
					</Flex>
					<Flex
						gap="2"
						align="center"
						justify="start"
						className="w-full"
					>
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Tags:
						</Label.Mid200>
						{tags?.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full"
							>
								{tags?.map((tag) => (
									<Badge key={tag?._id} variant={"default"}>
										{tag?.name}
									</Badge>
								))}
							</Flex>
						) : (
							"N/A"
						)}
					</Flex>
				</Flex>
			</CardContent>
			<CardFooter className="flex flex-col gap-2 items-center justify-center">
				<Label.Mid300>Language: {language}</Label.Mid300>
				<Label.Mid300>
					{availability}/{numberOfBookings} Bookings available
				</Label.Mid300>
			</CardFooter>
		</Card>
	);
}
