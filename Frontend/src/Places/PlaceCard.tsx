import { EllipsisVertical, LocateIcon, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
import { TPlace } from "@/types/global";

export default function PlaceCard({
	id,
	name,
	description,
	location,
	images,
	tags,
	categories,
	rating,
}: TPlace) {
	const navigate = useNavigate();

	return (
		<Card
			key={id}
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
						<DropdownMenu>
							<DropdownMenuTrigger>
								<EllipsisVertical className="cursor-pointer" />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem
									onClick={() => {
										navigate(`/places/${id}`);
									}}
								>
									View Place Details
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</Flex>
					<Label.Mid300>{description}</Label.Mid300>
					<Flex gap="2" align="center" justify="between">
						<Flex gap="2" align="center" justify="between">
							<MapPin size={20} />
							<Label.Thin200 className="overflow-ellipsis">
								{location}
							</Label.Thin200>
						</Flex>
						<Flex gap="1" align="center">
							<Star color="yellow" fill="yellow" size={20} />
							<Label.Thin300 className="overflow-ellipsis">
								{rating}
							</Label.Thin300>
						</Flex>
					</Flex>
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Categories:
						</Label.Mid200>
						{categories.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full"
							>
								{categories?.map((category) => (
									<Badge key={category} variant={"default"}>
										{category}
									</Badge>
								))}
							</Flex>
						) : (
							"N/A"
						)}
					</Flex>
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Tags:
						</Label.Mid200>
						{tags.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full"
							>
								{tags?.map((tag) => (
									<Badge key={tag} variant={"default"}>
										{tag}
									</Badge>
								))}
							</Flex>
						) : (
							"N/A"
						)}
					</Flex>
				</Flex>
			</CardContent>
		</Card>
	);
}
