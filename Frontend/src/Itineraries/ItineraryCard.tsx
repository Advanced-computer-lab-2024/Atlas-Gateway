import { EllipsisVertical, MapPin, Clock, DollarSign } from "lucide-react";
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
import { TItinerary } from "@/types/global";

export default function ItineraryCard({
	id,
	name,
	description,
	locations,
	timeline,
	duration,
	language,
	price,
	availableDates,
	availableTimes,
	accessibility,
	pickUp,
	dropOff,
}: TItinerary) {
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
					{/* You can replace this with an actual image if available */}
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
					<Label.Mid300>{description}</Label.Mid300>

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

					{/* Timeline */}
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Timeline:
						</Label.Mid200>
						{timeline.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full"
							>
								{timeline.map((item, index) => (
									<Badge key={index} variant={"default"}>
										{item}
									</Badge>
								))}
							</Flex>
						) : (
							"N/A"
						)}
					</Flex>

					{/* Duration */}
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Duration:
						</Label.Mid200>
						<Label.Mid500>{duration} hours</Label.Mid500>
					</Flex>

					{/* Language */}
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Language:
						</Label.Mid200>
						<Label.Mid500>{language}</Label.Mid500>
					</Flex>

					{/* Price */}
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Price:
						</Label.Mid200>
						<Label.Mid500>
							<DollarSign className="inline" /> {price}
						</Label.Mid500>
					</Flex>

					{/* Available Dates */}
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Available Dates:
						</Label.Mid200>
						{availableDates.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full"
							>
								{availableDates.map((date) => (
									<Badge key={date} variant={"default"}>
										{date}
									</Badge>
								))}
							</Flex>
						) : (
							"N/A"
						)}
					</Flex>

					{/* Available Times */}
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Available Times:
						</Label.Mid200>
						{availableTimes.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full"
							>
								{availableTimes.map((time) => (
									<Badge key={time} variant={"default"}>
										{time}
									</Badge>
								))}
							</Flex>
						) : (
							"N/A"
						)}
					</Flex>

					{/* Accessibility */}
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Accessibility:
						</Label.Mid200>
						<Label.Mid500>{accessibility}</Label.Mid500>
					</Flex>

					{/* Pick-Up Location */}
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Pick-Up:
						</Label.Mid200>
						<Label.Mid500>{pickUp}</Label.Mid500>
					</Flex>

					{/* Drop-Off Location */}
					<Flex gap="2" align="center">
						<Label.Mid200 className="overflow-ellipsis w-[95px] text-left">
							Drop-Off:
						</Label.Mid200>
						<Label.Mid500>{dropOff}</Label.Mid500>
					</Flex>
				</Flex>
			</CardContent>
		</Card>
	);
}
