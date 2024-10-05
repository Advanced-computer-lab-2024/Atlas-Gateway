import { ArrowLeft, LocateIcon, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { usePlace } from "@/api/data/usePlaces";
import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";

export default function PlaceDetails() {
	const navigate = useNavigate();
	const { data } = usePlace();
	const { name, description, location, images, tags, categories, rating } =
		data || {};

	const openingHours = {
		friday: {
			open: "10:00",
			close: "18:00",
		},
		monday: {
			open: "10:00",
			close: "18:00",
		},
		saturday: {
			open: "10:00",
			close: "18:00",
		},
		sunday: {
			open: "10:00",
			close: "18:00",
		},
		thursday: {
			open: "10:00",
			close: "18:00",
		},
		tuesday: {
			open: "10:00",
			close: "18:00",
		},
		wednesday: {
			open: "10:00",
			close: "18:00",
		},
	};
	return (
		<Flex
			isColumn
			gap="4"
			align="center"
			className="px-4 py-4 overflow-y-scroll"
		>
			<Card className="w-[80%] flex-col border-surface-secondary border-2 p-4">
				<Flex isColumn gap="4">
					<Flex gap="2" align="center">
						<ArrowLeft
							className="cursor-pointer"
							onClick={() => navigate("/places")}
							size={32}
						/>
						<Label.Big600>{name}</Label.Big600>
					</Flex>
					<Flex gap="12">
						<Flex
							align="center"
							justify="center"
							className="w-[600px] h-[400px] bg-gray-200 rounded-xl"
						>
							{images?.[0] ? (
								<img src={images[0]} />
							) : (
								<LocateIcon className="w-full h-40" />
							)}
						</Flex>
						<Flex isColumn justify="around">
							<Flex gap="2" align="center" justify="between">
								<Label.Big600 className="w-40 text-left">
									Description:{" "}
								</Label.Big600>
								<Label.Mid500>{description}</Label.Mid500>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-40 text-left">
									Location:{" "}
								</Label.Big600>
								<Label.Mid500 className="overflow-ellipsis">
									{location}
								</Label.Mid500>
								<MapPin size={32} />
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-40 text-left">
									Rating:{" "}
								</Label.Big600>
								<Label.Mid500 className="overflow-ellipsis">
									{rating}
								</Label.Mid500>
								<Star color="yellow" fill="yellow" size={32} />
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-40 text-left">
									Categories:
								</Label.Big600>
								{categories && categories?.length > 0 ? (
									<Flex
										gap="1"
										align="center"
										className="overflow-x-scroll w-full"
									>
										{categories?.map((category) => (
											<Badge
												key={category}
												variant={"default"}
											>
												{category}
											</Badge>
										))}
									</Flex>
								) : (
									"N/A"
								)}
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-40 text-left">
									Tags:
								</Label.Big600>
								{tags && tags?.length > 0 ? (
									<Flex
										gap="1"
										align="center"
										className="overflow-x-scroll w-full"
									>
										{tags?.map((tag) => (
											<Badge
												key={tag}
												variant={"default"}
											>
												{tag}
											</Badge>
										))}
									</Flex>
								) : (
									"N/A"
								)}
							</Flex>
						</Flex>
					</Flex>
					<hr />
					<Flex isColumn gap="2">
						{[
							{
								label: "Sunday",
								value: openingHours.sunday,
							},
							{
								label: "Monday",
								value: openingHours.monday,
							},
							{
								label: "Tuesday",
								value: openingHours.tuesday,
							},
							{
								label: "Wednesday",
								value: openingHours.wednesday,
							},
							{
								label: "Thursday",
								value: openingHours.thursday,
							},
							{
								label: "Friday",
								value: openingHours.friday,
							},
							{
								label: "Saturday",
								value: openingHours.saturday,
							},
						].map((day) => (
							<Flex gap="2" align="center">
								<Label.Mid500 className="w-[140px] text-left">
									{day?.label}
								</Label.Mid500>
								{day?.value?.open && day?.value?.close ? (
									<Label.Mid200 className="overflow-ellipsis">
										{day?.value?.open} - {day?.value?.close}
									</Label.Mid200>
								) : (
									"Closed"
								)}
							</Flex>
						))}
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
}
