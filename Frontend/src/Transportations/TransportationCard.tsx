import { formatDate } from "date-fns";
import { Copy, Edit, EllipsisVertical, Eye, Mail } from "lucide-react";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
	useDeleteTransportation,
	useTransportations,
} from "@/api/data/useTransportations";
import Label from "@/components/ui/Label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flex } from "@/components/ui/flex";
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";
import { TTransportation } from "@/types/global";

export default function TransportationCard({
	transportation,
	openEditDrawer,
}: {
	transportation: TTransportation;
	openEditDrawer: (transportation: TTransportation) => void;
}) {
	const navigate = useNavigate();
	const { user } = useLoginStore();

	const { refetch } = useTransportations();
	const { doDeleteTransportation } = useDeleteTransportation(refetch);

	if (!transportation) {
		return (
			<Card className="w-full h-[150px] flex items-center justify-center border-black border-2">
				<Label.Mid500>No transportation data found</Label.Mid500>
			</Card>
		);
	}

	// Function to copy the transportation link to the clipboard
	const handleCopyLink = () => {
		const transportationLink = `${window.location.origin}/transportations/${transportation._id}`;
		navigator.clipboard
			.writeText(transportationLink)
			.then(() => {
				alert("Link copied to clipboard!");
			})
			.catch((err) => {
				console.error("Failed to copy link:", err);
			});
	};

	// Function to create a mailto link for sharing via email
	const handleShareByEmail = () => {
		const transportationLink = `${window.location.origin}/transportations/${transportation._id}`;
		const subject = encodeURIComponent(
			`Check out this transportation: ${transportation.name}`,
		);
		const body = encodeURIComponent(
			`Hey, I found this transportation and thought you might like it!\n\n${transportationLink}`,
		);
		window.location.href = `mailto:?subject=${subject}&body=${body}`;
	};

	return (
		<Card
			key={transportation?._id}
			className="w-full h-[350px] flex gap-1 flex-col border-black border-2"
		>
			<CardHeader>
				<Flex
					gap="2"
					align="center"
					justify="center"
					className="relative w-full"
				>
					<Label.Mid500 className="justify-self-center">
						{transportation?.name}
					</Label.Mid500>
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger className="absolute right-0">
							<EllipsisVertical className="cursor-pointer" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{user?.type ===
								EAccountType.TransportationAdvertiser && (
								<>
									<DropdownMenuItem
										className="flex gap-2 cursor-pointer"
										onClick={() => {
											openEditDrawer(transportation);
										}}
									>
										<Edit />
										Edit
									</DropdownMenuItem>
									<DropdownMenuItem
										className="flex gap-2 cursor-pointer"
										onClick={() => {
											doDeleteTransportation(
												transportation?._id,
											);
										}}
									>
										<Trash />
										Delete
									</DropdownMenuItem>
								</>
							)}
							<DropdownMenuItem
								className="flex gap-2 cursor-pointer"
								onClick={() => {
									navigate(
										`/transportations/${transportation?._id}`,
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
						</DropdownMenuContent>
					</DropdownMenu>
				</Flex>
			</CardHeader>
			<CardContent>
				<Flex isColumn gap="4">
					<Flex gap="2" align="center" justify="between">
						<Label.Thin300>From:</Label.Thin300>
						<Label.Mid300>
							{transportation?.pickUpLocation}
						</Label.Mid300>
					</Flex>
					<Flex gap="2" align="center" justify="between">
						<Label.Thin300>To:</Label.Thin300>
						<Label.Mid300>
							{transportation?.dropOffLocation}
						</Label.Mid300>
					</Flex>
					<Flex gap="2" align="center" justify="between">
						<Label.Thin300>Departure Time:</Label.Thin300>
						<Label.Mid300>
							{transportation?.pickUpTime &&
								formatDate(
									new Date(transportation?.pickUpTime),
									"dd/MM/yyyy HH:mm:ss a",
								)}{" "}
						</Label.Mid300>
					</Flex>

					<Flex gap="2" align="center" justify="between">
						<Label.Thin300>Arrival Time:</Label.Thin300>
						<Label.Mid300>
							{transportation?.dropOffTime &&
								formatDate(
									new Date(transportation?.dropOffTime),
									"dd/MM/yyyy HH:mm:ss a",
								)}{" "}
						</Label.Mid300>
					</Flex>
					<Flex gap="2" align="center" justify="between">
						<Label.Thin300>Price:</Label.Thin300>
						<Label.Mid300>{transportation?.price}</Label.Mid300>
					</Flex>

					<Flex gap="2" align="center" justify="between">
						<Label.Thin300>Type:</Label.Thin300>
						<Label.Mid300>{transportation?.type}</Label.Mid300>
					</Flex>

					<Flex className="w-full" align="center" justify="between">
						<Flex gap="2" align="center">
							<Label.Thin300>Number of bookings:</Label.Thin300>
							<Label.Mid300>
								{transportation?.numberOfBookings}
							</Label.Mid300>
						</Flex>
					</Flex>
				</Flex>
			</CardContent>
		</Card>
	);
}
