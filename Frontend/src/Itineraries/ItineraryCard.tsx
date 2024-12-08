import { formatDate } from "date-fns";
import {
	Bell,
	Bookmark,
	Copy,
	DollarSign,
	Edit,
	EllipsisVertical,
	Eye,
	Flag,
	Mail,
	ToggleLeft,
	ToggleRight,
	Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
	useBookmarkItinerary,
	useDeleteItinerary,
	useFlagItinerary,
	useItineraries,
	useItineraryNotification,
	useRemoveBookmarkItinerary,
	useToggleItineraryStatus,
} from "@/api/data/useItineraries";
import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flex } from "@/components/ui/flex";
import Rating, { ERatingType } from "@/components/ui/rating";
import useCurrency from "@/hooks/useCurrency";
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
	const convertCurrency = useCurrency();

	const { refetch } = useItineraries();
	const { doBookmarkItinerary } = useBookmarkItinerary(refetch);
	const { doRemoveBookmarkItinerary } = useRemoveBookmarkItinerary(refetch);
	const { doDeleteItinerary } = useDeleteItinerary(refetch);
	const { doFlagItinerary } = useFlagItinerary(refetch);
	const { doToggleItineraryStatus } = useToggleItineraryStatus(refetch);
	const { doNotifyItinerary } = useItineraryNotification(refetch); 

	// Function to copy the itinerary link to the clipboard
	const handleCopyLink = () => {
		const itineraryLink = `${window.location.origin}/itineraries/${itinerary?._id}`;
		navigator.clipboard
			.writeText(itineraryLink)
			.then(() => {
				alert("Link copied to clipboard!");
			})
			.catch((err) => {
				console.error("Failed to copy link:", err);
			});
	};

	// Function to create a mailto link for sharing via email
	const handleShareByEmail = () => {
		const itineraryLink = `${window.location.origin}/itineraries/${itinerary?._id}`;
		const subject = encodeURIComponent(
			`Check out this itinerary: ${itinerary?.title}`,
		);
		const body = encodeURIComponent(
			`Hey, I found this itinerary and thought you might like it!\n\n${itineraryLink}`,
		);
		window.location.href = `mailto:?subject=${subject}&body=${body}`;
	};

	const handleNotificationClick = () => {
		if (itinerary?._id) {
			doNotifyItinerary(itinerary._id); // Send the notification request
		}
	};

	return (
		<Card
			key={itinerary?._id}
			className="w-full h-[370px] flex gap-1 flex-col border-black border-2"
		>
			<CardHeader>
				<Flex
					gap="2"
					align="center"
					justify="center"
					className="relative w-full"
				>
					{user?.type === EAccountType.Tourist &&
						(itinerary?.touristBookmarks?.includes(user?._id) ? (
							<Bookmark
								fill="black"
								className="absolute left-0"
								onClick={() => {
									if (itinerary?._id) {
										doRemoveBookmarkItinerary(
											itinerary?._id,
										);
									}
								}}
							/>
						) : (
							<Bookmark
								className="absolute left-0"
								onClick={() => {
									if (itinerary?._id) {
										doBookmarkItinerary(itinerary?._id);
									}
								}}
							/>
						))}
						<Bell
                            className="absolute left-8 cursor-pointer"
                            onClick={handleNotificationClick}
                        />
					<Label.Mid500>{itinerary?.title ?? "Title"}</Label.Mid500>
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger className="absolute right-0">
							<EllipsisVertical />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => {
									navigate(`/itineraries/${itinerary?._id}`);
								}}
							>
								<Eye />
								View Details
							</DropdownMenuItem>
							<DropdownMenuItem onClick={handleCopyLink}>
								<Copy />
								Copy Link
							</DropdownMenuItem>
							<DropdownMenuItem onClick={handleShareByEmail}>
								<Mail />
								Share Via Email
							</DropdownMenuItem>
							{user?.type === EAccountType.Guide && (
								<>
									<DropdownMenuItem
										onClick={() => {
											openEditDrawer(itinerary);
										}}
									>
										<Edit />
										Edit
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => {
											doDeleteItinerary(itinerary?._id);
										}}
									>
										<Trash />
										Delete
									</DropdownMenuItem>
								</>
							)}
							{user?.type === EAccountType.Admin && (
								<>
									<DropdownMenuItem
										onClick={() => {
											doFlagItinerary(itinerary?._id);
										}}
									>
										<Flag />
										Flag as Inappropriate
									</DropdownMenuItem>
								</>
							)}
							{user?.type === EAccountType.Guide && (
								<>
									<DropdownMenuItem
										onClick={() => {
											doToggleItineraryStatus(
												itinerary?._id,
											);
										}}
									>
										{itinerary.isActive ? (
											<ToggleLeft className="text-red-600" />
										) : (
											<ToggleRight className="text-green-600" />
										)}
										{itinerary.isActive
											? "Deactivate"
											: "Activate"}
									</DropdownMenuItem>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</Flex>
			</CardHeader>
			<CardContent>
				<Flex isColumn gap="2">
					<Flex gap="2" align="center" className="w-full">
						<Label.Thin300 className="overflow-ellipsis w-[85px] text-left">
							Activities:
						</Label.Thin300>
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
					<Flex gap="2" align="center" className="w-full">
						<Label.Thin300 className="overflow-ellipsis w-[85px] text-left">
							Tags:
						</Label.Thin300>
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
					<Flex className="w-full" align="center" justify="between">
						<Flex gap="1" align="center">
							<DollarSign size={20} />
							<Label.Thin300 className="overflow-ellipsis">
								{convertCurrency(itinerary?.price)}
							</Label.Thin300>
						</Flex>
						<Flex gap="1" align="center">
							<Rating
								value={itinerary?.avgRating}
								interactive={false}
								ratingType={ERatingType.CARDS}
							/>
						</Flex>
					</Flex>
					<Flex gap="2" isColumn align="center">
						<Flex
							isColumn
							gap="1"
							align="center"
							className="w-full"
						>
							<Label.Thin300>Pickup</Label.Thin300>
							<Label.Mid300 className="break-words text-center w-full ">
								{itinerary?.startDateTime &&
									formatDate(
										new Date(itinerary?.startDateTime),
										"dd/MM/yyyy HH:mm:ss a",
									)}{" "}
								at {itinerary?.pickUpLocation}
							</Label.Mid300>
						</Flex>
						<Flex isColumn align="center" className="w-full">
							<Label.Thin300>Dropoff</Label.Thin300>
							<Label.Mid300 className="break-words w-full text-center h-10 overflow-y-scroll">
								{itinerary?.endDateTime &&
									formatDate(
										new Date(itinerary?.endDateTime),
										"dd/MM/yyyy HH:mm:ss a",
									)}{" "}
								at {itinerary?.dropOffLocation}
							</Label.Mid300>
						</Flex>
					</Flex>
				</Flex>
				<Flex align="center" justify="between" className="w-full">
					<Label.Mid300>
						Language:{" "}
						{languageOptions?.find(
							(option) => option.value === itinerary?.language,
						)?.label ?? itinerary?.language}
					</Label.Mid300>
					<Label.Mid300>
						{itinerary?.availability} Spots left
					</Label.Mid300>
				</Flex>
			</CardContent>
			<CardFooter>
				<Flex align="center" justify="center" className="w-full">
					<Label.Mid300>
						isAppropriate: {itinerary?.isAppropriate ? "Yes" : "No"}
					</Label.Mid300>
				</Flex>
			</CardFooter>
		</Card>
	);
}
