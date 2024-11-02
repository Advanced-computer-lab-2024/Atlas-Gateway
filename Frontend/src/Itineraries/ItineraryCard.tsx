import { formatDate } from "date-fns";
import {
	DollarSign,
	Edit,
	EllipsisVertical,
	Eye,
	MapPin,
	Star,
	Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useDeleteItinerary, useItineraries } from "@/api/data/useItineraries";
import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flex } from "@/components/ui/flex";
import { useLoginStore } from "@/store/loginStore";
import { languageOptions } from "@/types/consts";
import { EAccountType } from "@/types/enums";
import { TItinerary } from "@/types/global";

export default function ItineraryCard({
	openEditDrawer,
	itinerary,
}: {
	itinerary: TItinerary;
	openEditDrawer: (activity: TItinerary) => void;
}) {
	const navigate = useNavigate();
	const { user } = useLoginStore();

	const { refetch } = useItineraries();
	const { doDeleteItinerary } = useDeleteItinerary(refetch);


	// Function to copy the itinerary link to the clipboard
	const handleCopyLink = () => {
		const itineraryLink = `${window.location.origin}/itineraries/${itinerary?._id}`;
		navigator.clipboard.writeText(itineraryLink)
			.then(() => {
				alert('Link copied to clipboard!');
			})
			.catch((err) => {
				console.error('Failed to copy link:', err);
			});
	};

	// Function to create a mailto link for sharing via email
	const handleShareByEmail = () => {
		const itineraryLink = `${window.location.origin}/itineraries/${itinerary?._id}`;
		const subject = encodeURIComponent(`Check out this itinerary: ${itinerary?.title}`);
		const body = encodeURIComponent(`Hey, I found this itinerary and thought you might like it!\n\n${itineraryLink}`);
		window.location.href = `mailto:?subject=${subject}&body=${body}`;
	};


	return (
		<Card
			key={itinerary?._id}
			className="w-full h-[385px] flex gap-1 flex-col border-surface-secondary border-2"
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
							{itinerary?.title ?? "Title"}
						</Label.Mid500>

						<DropdownMenu modal={false}>
							<DropdownMenuTrigger className="absolute right-0">
								<EllipsisVertical className="cursor-pointer" />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem
									className="flex gap-2 cursor-pointer"
									onClick={() => {
										navigate(
											`/itineraries/${itinerary?._id}`,
										);
									}}
								>
									<Eye />
									View Details
								</DropdownMenuItem>
								{user?.type === EAccountType.Guide && (
									<>
										<DropdownMenuItem
											className="flex gap-2 cursor-pointer"
											onClick={() => {
												openEditDrawer(itinerary);
											}}
										>
											<Edit />
											Edit
										</DropdownMenuItem>
										<DropdownMenuItem
											className="flex gap-2 cursor-pointer"
											onClick={() => {
												doDeleteItinerary(
													itinerary?._id,
												);
											}}
										>
											<Trash />
											Delete
										</DropdownMenuItem>
									</>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</Flex>
					<Flex gap="2" isColumn align="center">
						<Flex gap="2" align="center" justify="between">
							<Label.Thin200>Pickup:</Label.Thin200>
							<MapPin size={20} />
							<Label.Thin200 className="overflow-ellipsis">
								{itinerary?.pickUpLocation}
							</Label.Thin200>
						</Flex>
						<Flex gap="2" align="center" justify="between">
							<Label.Thin200>Dropoff:</Label.Thin200>
							<MapPin size={20} />
							<Label.Thin200 className="overflow-ellipsis">
								{itinerary?.dropOffLocation}
							</Label.Thin200>
						</Flex>
						<Flex gap="1" align="center" justify="between">
							<Label.Thin200>
								{itinerary?.startDateTime &&
									formatDate(
										new Date(itinerary?.startDateTime),
										"dd/MM/yyyy HH:mm:ss a",
									)}
							</Label.Thin200>
							<Label.Thin200>To</Label.Thin200>
							<Label.Thin200 className="overflow-ellipsis">
								{itinerary?.endDateTime &&
									formatDate(
										new Date(itinerary?.endDateTime),
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
								{itinerary?.price}
							</Label.Thin300>
						</Flex>
						<Flex gap="1" align="center">
							<Star color="yellow" fill="yellow" size={20} />
							<Label.Thin300 className="overflow-ellipsis">
								{itinerary?.avgRating ?? "N/A"}
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
							Activities:
						</Label.Mid200>
						{itinerary?.activities?.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full h-8"
							>
								{itinerary?.activities?.map((activity) => (
									<Badge
										key={activity?.title}
										variant={"default"}
										className="whitespace-nowrap"
									>
										{activity.title}
									</Badge>
								))}
							</Flex>
						) : (
							"N/A"
						)}
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
						{itinerary?.tags?.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full h-8"
							>
								{itinerary?.tags?.map((tag) => (
									<Badge
										key={tag?._id}
										variant={"default"}
										className="whitespace-nowrap"
									>
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
				<Label.Mid300>
					Language:{" "}
					{languageOptions?.find(
						(option) => option.value === itinerary?.language,
					)?.label ?? itinerary?.language}
				</Label.Mid300>
				<Label.Mid300>
					{itinerary?.numberOfBookings}/{itinerary?.availability}{" "}
					Bookings Available
				</Label.Mid300>
				{/* Share buttons */}
				<Flex gap="2" justify="center" className="mt-2">
					{/* Share via Link */}
					<button
						className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
						onClick={handleCopyLink}
					>
						Copy Link
					</button>

					{/* Share via Email */}
					<button
						className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
						onClick={handleShareByEmail}
					>
						Share via Email
					</button>
				</Flex>
			</CardFooter>
		</Card>
	);
}
