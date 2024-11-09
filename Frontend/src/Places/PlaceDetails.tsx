import { ArrowLeft, LocateIcon, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { usePlace } from "@/api/data/usePlaces";
import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import useCurrency from "@/hooks/useCurrency";

export default function PlaceDetails() {
	const navigate = useNavigate();
	const { data } = usePlace();
	const convertCurrency = useCurrency();

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
			justify="center"
			align="center"
			className="p-4 overflow-y-scroll w-full h-full"
		>
			<Card className="w-[80%] border-black border-2">
				<CardHeader>
					<Flex gap="2" align="center">
						<ArrowLeft
							className="cursor-pointer"
							onClick={() => navigate("/places")}
							size={32}
						/>
						<Label.Big600>{name}</Label.Big600>
					</Flex>
				</CardHeader>
				<CardContent>
					<Flex isColumn gap="4">
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
							<Flex gap="3" isColumn align="start">
								<Label.Big500>Place info</Label.Big500>
								<Flex gap="2" isColumn>
									<Label.Thin300 className="text-left">
										Description
									</Label.Thin300>
									<Label.Mid500 className="text-left overflow-ellipsis">
										{description}
									</Label.Mid500>
								</Flex>
								<Flex gap="2" isColumn>
									<Label.Thin300 className="text-left">
										Location
									</Label.Thin300>
									<Flex gap="2" align="center">
										<Label.Mid500 className="overflow-ellipsis">
											{location}
										</Label.Mid500>
										<MapPin size={24} />
									</Flex>
								</Flex>
								<Flex justify="around" className="w-full">
									<Flex gap="2" isColumn align="center">
										<Label.Thin300>
											Foreigner ticket price
										</Label.Thin300>
										<Label.Mid500>
											{convertCurrency(
												ticketPrices?.foreigner,
											) ?? 0}
										</Label.Mid500>
									</Flex>
									<Flex gap="2" isColumn align="center">
										<Label.Thin300>
											Native ticket price
										</Label.Thin300>
										<Label.Mid500>
											{convertCurrency(
												ticketPrices?.native,
											) ?? 0}
										</Label.Mid500>
									</Flex>
									<Flex gap="2" isColumn align="center">
										<Label.Thin300>
											Student ticket price
										</Label.Thin300>
										<Label.Mid500>
											{convertCurrency(
												ticketPrices?.student,
											) ?? 0}
										</Label.Mid500>
									</Flex>
								</Flex>
								<Flex gap="2" isColumn>
									<Label.Thin300 className="text-left">
										Tags:
									</Label.Thin300>
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
										"No tags"
									)}
								</Flex>
							</Flex>
						</Flex>
						<hr />
						<Flex isColumn gap="2" className="grid grid-cols-4">
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
								<Flex gap="2" isColumn>
									<Label.Thin400 className="w-[140px] text-left">
										{day?.label}
									</Label.Thin400>
									{!day?.value?.dayOff ? (
										<Label.Mid400 className="overflow-ellipsis">
											{day?.value?.open}
											{day?.value?.close}
										</Label.Mid400>
									) : (
										"Closed"
									)}
								</Flex>
							))}
						</Flex>
					</Flex>
				</CardContent>
			</Card>
		</Flex>
	);
}
