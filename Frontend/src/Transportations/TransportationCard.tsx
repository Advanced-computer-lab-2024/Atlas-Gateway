import {
	Copy,
	Edit,
	EllipsisVertical,
	Eye,
	Mail,
} from "lucide-react";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useTransportations, useDeleteTransportation } from "@/api/data/useTransportations";
import Label from "@/components/ui/Label";
import {
	Card,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
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
							<DropdownMenuItem
								className="flex gap-2 cursor-pointer"
								onClick={() => {
									navigate(`/transportations/${transportation?._id}`);
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
											openEditDrawer(transportation);
										}}
									>
										<Edit />
										Edit
									</DropdownMenuItem>
									<DropdownMenuItem
										className="flex gap-2 cursor-pointer"
										onClick={() => {
											doDeleteTransportation(transportation?._id);
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
			</CardHeader>
			<CardContent>
				<Flex isColumn gap="4">
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