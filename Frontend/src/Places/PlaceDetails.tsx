import { ArrowLeft, LocateIcon, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { usePlace } from "@/api/data/usePlaces";
import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";

export default function PlaceDetails() {
	const navigate = useNavigate();
	const { data } = usePlace();
	const {
		name,
		description,
		location,
		images,
		tags,
		openingHours,
		ticketPrices,
	} = data || {};

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
					<Flex gap="6">
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
						<Flex
							isColumn
							justify="around"
							className="w-[400px] overflow-x-scroll"
						>
							<Flex gap="2" align="center">
								<Label.Mid600 className="text-left">
									Description:{" "}
								</Label.Mid600>
								<Label.Thin400 className="text-left overflow-ellipsis">
									{description}
								</Label.Thin400>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Mid600 className="text-left">
									Location:{" "}
								</Label.Mid600>
								<Label.Thin400 className="overflow-ellipsis">
									{location}
								</Label.Thin400>
								<MapPin size={32} />
							</Flex>
							<Flex gap="2" align="center">
								<Label.Mid600 className="text-left">
									Foreigner ticket price:{" "}
								</Label.Mid600>
								<Label.Thin400 className="overflow-ellipsis">
									{ticketPrices?.foreigner}
								</Label.Thin400>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Mid600 className="text-left">
									Native ticket price:{" "}
								</Label.Mid600>
								<Label.Thin400 className="overflow-ellipsis">
									{ticketPrices?.native}
								</Label.Thin400>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Mid600 className="text-left">
									Student ticket price:{" "}
								</Label.Mid600>
								<Label.Thin400 className="overflow-ellipsis">
									{ticketPrices?.student}
								</Label.Thin400>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Mid600 className="text-left">
									Tags:
								</Label.Mid600>
								{tags && tags?.length > 0 ? (
									<Flex
										gap="1"
										align="center"
										className="h-8"
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
					</Flex>
					<hr />
					<Flex isColumn gap="2">
						{[
							{
								label: "Sunday",
								value: openingHours?.sunday,
							},
							{
								label: "Monday",
								value: openingHours?.monday,
							},
							{
								label: "Tuesday",
								value: openingHours?.tuesday,
							},
							{
								label: "Wednesday",
								value: openingHours?.wednesday,
							},
							{
								label: "Thursday",
								value: openingHours?.thursday,
							},
							{
								label: "Friday",
								value: openingHours?.friday,
							},
							{
								label: "Saturday",
								value: openingHours?.saturday,
							},
						].map((day) => (
							<Flex gap="2" align="center">
								<Label.Mid500 className="w-[140px] text-left">
									{day?.label}
								</Label.Mid500>
								{!day?.value?.dayOff ? (
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
