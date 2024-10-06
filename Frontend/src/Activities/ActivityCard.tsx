import axios from "axios";
import { formatDate } from "date-fns";
import { DollarSign, EllipsisVertical, MapPin, Star } from "lucide-react";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
import { TActivity } from "@/types/global";

import AddActivityForm from "./Form/ActivityForm";

export default function ActivityCard({
	_id,
	name,
	location,
	tags,
	categories,
	dateTime,
	isOpen,
	maxPrice,
	specialDiscounts,
	minPrice,
	avgRating,
	description,
}: TActivity) {
	const navigate = useNavigate();

	const handleDelete = (id: string) => {
		axios
			.delete(`http://localhost:5000/api/activity/delete/${id}`)
			.then((res) => {
				console.log(res.status);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Card
			key={_id}
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
							{name}
						</Label.Mid500>
						<Flex>
							<DropdownMenu>
								<DropdownMenuTrigger className="absolute right-0">
									<EllipsisVertical className="cursor-pointer" />
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem
										onClick={() => {
											navigate(`/activities/${_id}`);
										}}
									>
										View Activtiy Details
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<AddActivityForm type={"Update"} id={_id} />
							<button onClick={() => handleDelete(_id)}>
								<Trash />
							</button>
						</Flex>
					</Flex>
					<Label.Thin200 className="overflow-ellipsis line-clamp-3">
						{description}
					</Label.Thin200>
					<Flex gap="2" isColumn align="center">
						<Flex gap="2" align="center" justify="between">
							<MapPin size={20} />
							<Label.Thin200 className="overflow-ellipsis">
								{location}
							</Label.Thin200>
						</Flex>
						<Label.Mid200 className="overflow-ellipsis">
							{dateTime &&
								formatDate(
									new Date(dateTime),
									"dd/MM/yyyy HH:mm:ss a",
								)}
						</Label.Mid200>
					</Flex>
					<Flex className="w-full" align="center" justify="between">
						<Flex gap="1" align="center">
							<DollarSign size={20} />
							<Label.Thin300 className="overflow-ellipsis">
								{minPrice} - {maxPrice}
							</Label.Thin300>
						</Flex>
						<Flex gap="1" align="center">
							<Star color="yellow" fill="yellow" size={20} />
							<Label.Thin300 className="overflow-ellipsis">
								{avgRating ?? "N/A"}
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
						{categories?.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full h-8"
							>
								{categories?.map((category) => (
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
			<CardFooter className="flex flex-col gap-2 items-center justify-center">
				<Label.Mid300>
					Available Special Discounts: {specialDiscounts}%
				</Label.Mid300>
				<Label.Mid300>
					{isOpen ? "Bookings Open" : "Bookings Closed"}
				</Label.Mid300>
			</CardFooter>
		</Card>
	);
}
