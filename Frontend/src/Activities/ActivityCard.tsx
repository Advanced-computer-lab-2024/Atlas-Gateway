import { formatDate } from "date-fns";
import {
	Bell,
	Bookmark,
	Copy,
	DollarSign,
	Edit,
	EllipsisVertical,
	Eye,
	Mail,
	MapPin,
} from "lucide-react";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
	useActivities,
	useActivityNotification,
	useBookmarkActivity,
	useDeleteActivity,
	useRemoveBookmarkActivity,
} from "@/api/data/useActivities";
import AreYouSure from "@/components/ui/AreYouSure";
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
import { EAccountType } from "@/types/enums";
import { TActivity } from "@/types/global";

export default function ActivityCard({
	activity,
	openEditDrawer,
}: {
	activity: TActivity;
	openEditDrawer: (activity: TActivity) => void;
}) {
	const navigate = useNavigate();
	const { user } = useLoginStore();
	const convertCurrency = useCurrency();

	const { refetch } = useActivities();
	const { doDeleteActivity } = useDeleteActivity(refetch);

	const { doBookmarkActivity } = useBookmarkActivity(() => {
		refetch();
	});
	const { doRemoveBookmarkActivity } = useRemoveBookmarkActivity(() => {
		refetch();
	});
	const { doNotifyActivity } = useActivityNotification(refetch);

	// Function to copy the activity link to the clipboard
	const handleCopyLink = () => {
		const activityLink = `${window.location.origin}/activities/${activity._id}`;
		navigator.clipboard
			.writeText(activityLink)
			.then(() => {
				alert("Link copied to clipboard!");
			})
			.catch((err) => {
				console.error("Failed to copy link:", err);
			});
	};

	// Function to create a mailto link for sharing via email
	const handleShareByEmail = () => {
		const activityLink = `${window.location.origin}/activities/${activity._id}`;
		const subject = encodeURIComponent(
			`Check out this activity: ${activity.name}`,
		);
		const body = encodeURIComponent(
			`Hey, I found this activity and thought you might like it!\n\n${activityLink}`,
		);
		window.location.href = `mailto:?subject=${subject}&body=${body}`;
	};

	const handleNotificationClick = () => {
		if (activity?._id) {
			doNotifyActivity(activity._id); // Send the notification request
		}
	};

	return (
		<Card
			key={activity?._id}
			className="w-full h-[350px] flex gap-1 flex-col border-black border-2"
		>
			<CardHeader>
				<Flex
					gap="2"
					align="center"
					justify="center"
					className="relative w-full"
				>
					{user?.type === EAccountType.Tourist &&
						(activity?.touristBookmarks?.includes(user?._id) ? (
							<Bookmark
								fill="black"
								className="absolute left-0 cursor-pointer"
								onClick={() => {
									if (activity?._id) {
										doRemoveBookmarkActivity(activity?._id);
									}
								}}
							/>
						) : (
							<Bookmark
								className="absolute left-0 cursor-pointer"
								onClick={() => {
									if (activity?._id) {
										doBookmarkActivity(activity?._id);
									}
								}}
							/>
						))}
					{user?.type === EAccountType.Tourist &&
						(activity?.notificationRequested?.includes(
							user?._id,
						) ? (
							<Bell
								fill="black"
								className="absolute left-8 cursor-pointer"
								onClick={handleNotificationClick}
							/>
						) : (
							<Bell
								className="absolute left-8 cursor-pointer"
								onClick={handleNotificationClick}
							/>
						))}
					<Label.Mid500 className="justify-self-center">
						{activity?.name ?? "-"}
					</Label.Mid500>
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger className="absolute right-0">
							<EllipsisVertical className="cursor-pointer" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								className="flex gap-2 cursor-pointer"
								onClick={() => {
									navigate(`/activities/${activity?._id}`);
								}}
							>
								<Eye />
								View Details
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex gap-2 cursor-pointer"
								onClick={handleCopyLink}
							>
								<Copy />
								Copy Link
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex gap-2 cursor-pointer"
								onClick={handleShareByEmail}
							>
								<Mail />
								Share Via Email
							</DropdownMenuItem>
							{user?.type === EAccountType.Advertiser && (
								<>
									<DropdownMenuItem
										className="flex gap-2 cursor-pointer"
										onClick={() => {
											openEditDrawer(activity);
										}}
									>
										<Edit />
										Edit
									</DropdownMenuItem>
									<AreYouSure
										title="Are you sure you want to delete this activity?"
										description="This action is irreversible"
										onConfirm={() => {
											doDeleteActivity(activity?._id);
										}}
									>
										<DropdownMenuItem className="flex gap-2 cursor-pointer">
											<Trash />
											Delete
										</DropdownMenuItem>
									</AreYouSure>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</Flex>
			</CardHeader>
			<CardContent>
				<Flex isColumn gap="4">
					<Flex className="w-full" align="center" justify="between">
						<Flex gap="1" align="center">
							<DollarSign size={20} />
							<Label.Thin300>
								{convertCurrency(activity?.minPrice)} -{" "}
								{convertCurrency(activity?.maxPrice)}
							</Label.Thin300>
						</Flex>
						<Flex gap="1" align="center">
							<Rating
								value={activity?.avgRating ?? 0}
								interactive={false}
								ratingType={ERatingType.CARDS}
							/>
						</Flex>
					</Flex>
					<Flex gap="2" align="center">
						<Label.Thin300>Location:</Label.Thin300>
						<MapPin size={20} />
						<Label.Mid300>{activity?.location}</Label.Mid300>
					</Flex>
					<Flex gap="2" align="center">
						<Label.Thin300>Time:</Label.Thin300>
						<Label.Mid300>
							{activity?.dateTime &&
								formatDate(
									new Date(activity?.dateTime),
									"dd/MM/yyyy HH:mm:ss a",
								)}
						</Label.Mid300>
					</Flex>
					<Flex gap="2" align="center">
						<Label.Thin300>Number of bookings:</Label.Thin300>
						<Label.Mid300>
							{activity?.numberOfBookings}
						</Label.Mid300>
					</Flex>
					<Flex
						gap="2"
						align="center"
						justify="start"
						className="w-full"
					>
						<Label.Thin300 className="overflow-ellipsis w-[85px] text-left">
							Category:
						</Label.Thin300>
						<Flex
							gap="1"
							align="center"
							className="overflow-x-scroll w-full"
						>
							<Badge
								key={activity?.categories?.[0]?._id}
								variant={"default"}
								className="whitespace-nowrap"
							>
								{activity?.categories?.[0]?.name}
							</Badge>
						</Flex>
					</Flex>
					<Flex
						gap="2"
						align="center"
						justify="start"
						className="w-full"
					>
						<Label.Thin300 className="overflow-ellipsis w-[85px] text-left">
							Tags:
						</Label.Thin300>
						{activity?.tags?.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full"
							>
								{activity?.tags?.map((tag) => (
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
							"No tags"
						)}
					</Flex>
				</Flex>
			</CardContent>
			<CardFooter>
				<Flex align="center" justify="between" className="w-full">
					<Label.Mid300>
						Available Special Discounts:{" "}
						{activity?.specialDiscounts}
					</Label.Mid300>
					<Label.Mid300>
						{activity?.isOpen ? "Bookings Open" : "Bookings Closed"}
					</Label.Mid300>
				</Flex>
			</CardFooter>
		</Card>
	);
}
