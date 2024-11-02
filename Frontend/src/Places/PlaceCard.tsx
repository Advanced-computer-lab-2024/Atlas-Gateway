import {
	Edit,
	EllipsisVertical,
	Eye,
	LocateIcon,
	MapPin,
	Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useDeletePlace, usePlaces } from "@/api/data/usePlaces";
import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flex } from "@/components/ui/flex";
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";
import { TPlace } from "@/types/global";

export default function PlaceCard({
	place,
	openEditDrawer,
}: {
	place: TPlace;
	openEditDrawer: (place: TPlace) => void;
}) {
	const navigate = useNavigate();
	const { user } = useLoginStore();

	const { _id, name, description, location, images, tags } = place;

	const { refetch } = usePlaces();

	const { doDeletePlace } = useDeletePlace(refetch);

	// Function to copy the place link to the clipboard
	const handleCopyLink = () => {
		const placeLink = `${window.location.origin}/places/${_id}`;
		navigator.clipboard.writeText(placeLink)
			.then(() => {
				alert('Link copied to clipboard!');
			})
			.catch((err) => {
				console.error('Failed to copy link:', err);
			});
	};

	// Function to create a mailto link for sharing via email
	const handleShareByEmail = () => {
		const placeLink = `${window.location.origin}/places/${_id}`;
		const subject = encodeURIComponent(`Check out this place: ${name}`);
		const body = encodeURIComponent(`Hey, I found this place and thought you might like it!\n\n${placeLink}`);
		window.location.href = `mailto:?subject=${subject}&body=${body}`;
	};


	return (
		<Card
			key={_id}
			className="w-full h-[400px] flex gap-1 flex-col border-surface-secondary border-2"
		>
			<Flex
				align="center"
				justify="center"
				className="w-full h-52 bg-gray-200 rounded-t-xl"
			>
				{images?.[0] ? (
					<img src={images[0]} />
				) : (
					<LocateIcon className="w-full h-40" />
				)}
			</Flex>
			<CardContent className="p-2">
				<Flex isColumn gap="2">
					<Flex gap="2" align="center" justify="between">
						<Label.Mid500>{name}</Label.Mid500>
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger>
								<EllipsisVertical className="cursor-pointer" />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem
									onClick={() => {
										navigate(`/places/${_id}`);
									}}
								>
									<Eye />
									View Details
								</DropdownMenuItem>
								{user?.type ===
									EAccountType.TourismGovernor && (
									<>
										<DropdownMenuItem
											className="flex gap-2 cursor-pointer"
											onClick={() => {
												openEditDrawer(place);
											}}
										>
											<Edit />
											Edit
										</DropdownMenuItem>
										<DropdownMenuItem
											className="flex gap-2 cursor-pointer"
											onClick={() => {
												doDeletePlace(place?._id);
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
					<Label.Mid300>{description}</Label.Mid300>
					<Flex gap="2" align="center">
						<MapPin size={20} />
						<Label.Thin200 className="overflow-ellipsis">
							{location}
						</Label.Thin200>
					</Flex>
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[50px] text-left">
							Tags:
						</Label.Mid200>
						{tags?.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full h-8"
							>
								{tags?.map((tag) => (
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
			{/* Share buttons */}
			<Flex gap="2" justify="center" className="p-2">
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
		</Card>
	);
}
