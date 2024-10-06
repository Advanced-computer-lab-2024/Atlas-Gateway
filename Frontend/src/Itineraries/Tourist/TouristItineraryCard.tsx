import { EllipsisVertical, MapPin, Calendar, Tag } from "lucide-react";
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
import { TTouristItinerary } from "@/types/global"; // Assume TActivity is defined in your types

export default function TouristItineraryCard({
	id,
	name,
	locations,
	dateRange,
	tags,
}: TTouristItinerary) {
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
				{/* Placeholder for an image or icon */}
				<div className="w-full h-full flex items-center justify-center">
					<Label.Mid500>{name}</Label.Mid500>
				</div>
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
										navigate(`/activities/${id}`);
									}}
								>
									View Activity Details
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</Flex>

					{/* Locations */}
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Locations:
						</Label.Mid200>
						{locations.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full"
							>
								{locations.map((location) => (
									<Badge key={location} variant={"default"}>
										{location}
									</Badge>
								))}
							</Flex>
						) : (
							"N/A"
						)}
					</Flex>

					{/* Date Range */}
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Date Range:
						</Label.Mid200>
						<Label.Mid500>{dateRange.start} - {dateRange.end}</Label.Mid500>
					</Flex>

					{/* Tags */}
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
								{tags.map((tag) => (
									<Badge key={tag} variant={"default"}>
										<Tag className="mr-1" /> {tag}
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
