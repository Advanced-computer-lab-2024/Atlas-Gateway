import { formatDate } from "date-fns";
import {
	Copy,
	DollarSign,
	Edit,
	EllipsisVertical,
	Eye,
	Mail,
	MapPin,
	Star,
} from "lucide-react";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useActivities, useDeleteActivity } from "@/api/data/useActivities";
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

	return (
		<Card
			key={activity?._id}
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
							{activity?.name}
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
											`/activities/${activity?._id}`,
										);
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
										<DropdownMenuItem
											className="flex gap-2 cursor-pointer"
											onClick={() => {
												doDeleteActivity(activity?._id);
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
					<Label.Thin200 className="overflow-ellipsis line-clamp-3">
						{activity?.description}
					</Label.Thin200>
					<Flex gap="2" isColumn align="center">
						<Flex gap="2" align="center" justify="between">
							<MapPin size={20} />
							<Label.Thin200 className="overflow-ellipsis">
								{activity?.location}
							</Label.Thin200>
						</Flex>
						<Label.Mid200 className="overflow-ellipsis">
							{activity?.dateTime &&
								formatDate(
									new Date(activity?.dateTime),
									"dd/MM/yyyy HH:mm:ss a",
								)}
						</Label.Mid200>
					</Flex>
					<Flex className="w-full" align="center" justify="between">
						<Flex gap="1" align="center">
							<DollarSign size={20} />
							<Label.Thin300 className="overflow-ellipsis">
								{convertCurrency(activity?.minPrice)} -{" "}
								{convertCurrency(activity?.maxPrice)}
							</Label.Thin300>
						</Flex>
						<Flex gap="1" align="center">
							<Star color="yellow" fill="yellow" size={20} />
							<Label.Thin300 className="overflow-ellipsis">
								{activity?.avgRating ?? "N/A"}
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
							Categories:
						</Label.Mid200>
						{activity?.categories?.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full"
							>
								{activity?.categories?.map((category) => (
									<Badge
										key={category?._id}
										variant={"default"}
										className="whitespace-nowrap"
									>
										{category?.name}
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
							"N/A"
						)}
					</Flex>
				</Flex>
			</CardContent>
			<CardFooter className="flex flex-col gap-2 items-center justify-center">
				<Label.Mid300>
					Available Special Discounts: {activity?.specialDiscounts}
				</Label.Mid300>
				<Label.Mid300>
					{activity?.isOpen ? "Bookings Open" : "Bookings Closed"}
				</Label.Mid300>
			</CardFooter>
		</Card>
	);
}
