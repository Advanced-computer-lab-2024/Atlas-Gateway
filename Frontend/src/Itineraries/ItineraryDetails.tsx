import axios from "axios";
import { formatDate } from "date-fns";
import { ArrowLeft, DollarSign, MapPin, Star } from "lucide-react";
import { useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useItinerary } from "@/api/data/useItineraries";
import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import Rating, { ratingType } from "@/components/ui/rating";
import { languageOptions } from "@/types/consts";

export default function ItineraryDetails() {
	const navigate = useNavigate();
	const { data } = useItinerary();
	const {
		availability,
		avgRating,
		dropOffLocation,
		startDateTime,
		activities,
		endDateTime,
		numberOfBookings,
		pickUpLocation,
		price,
		tags,
		language,
		title,
	} = data || {};

	const [displayValue, setDisplayValue] = React.useState<number | undefined>(
		0,
	);

	useEffect(() => {
		setDisplayValue(avgRating || 0);
	}, [avgRating]);

	const handleRatingChange = async (inputRating: number) => {
		try {
			const res = await axios.post(
				"http://localhost:5000/api/itineraries/addRating",
				{
					productId: data?._id,
					rating: inputRating,
					//User ID will be included in the request header
				},
			); //TODO: Add the correct endpoint when it is available

			if (!(res.status % 100 === 2)) {
				throw new Error("Error while saving rating");
			}

			//Show "Rating Saved" Prompt in frontend
			const confirmText = document.getElementById("confirmation");
			if (confirmText) {
				confirmText.classList.remove("hidden");
				setDisplayValue(inputRating);
				setTimeout(() => {
					confirmText.classList.add("hidden");
				}, 3000);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Flex
			isColumn
			gap="4"
			align="center"
			className="px-4 py-4 overflow-y-scroll"
		>
			<Card className="w-[80%] h-[700px] flex-col border-surface-secondary border-2 p-4">
				<Flex isColumn gap="4">
					<Flex gap="2" align="center">
						<ArrowLeft
							className="cursor-pointer"
							onClick={() => navigate("/itineraries")}
							size={32}
						/>
						<Label.Big600>{title}</Label.Big600>
					</Flex>
					<Flex gap="2" align="center">
						<Label.Mid600 className="w-60 text-left">
							Pickup:
						</Label.Mid600>
						<MapPin size={20} />
						<Label.Thin300 className="overflow-ellipsis">
							{pickUpLocation}
						</Label.Thin300>
					</Flex>
					<Flex gap="2" align="center">
						<Label.Mid600 className="w-60 text-left">
							Dropoff:
						</Label.Mid600>
						<MapPin size={20} />
						<Label.Thin300 className="overflow-ellipsis">
							{dropOffLocation}
						</Label.Thin300>
					</Flex>
					<Flex gap="2" align="center">
						<Label.Mid600 className="w-60 text-left">
							Start time:
						</Label.Mid600>
						<MapPin size={20} />
						<Label.Thin300 className="overflow-ellipsis">
							{startDateTime &&
								formatDate(
									new Date(startDateTime),
									"dd/MM/yyyy HH:mm:ss a",
								)}
						</Label.Thin300>
					</Flex>
					<Flex gap="2" align="center">
						<Label.Mid600 className="w-60 text-left">
							End time:
						</Label.Mid600>
						<MapPin size={20} />
						<Label.Thin300 className="overflow-ellipsis">
							{endDateTime &&
								formatDate(
									new Date(endDateTime),
									"dd/MM/yyyy HH:mm:ss a",
								)}
						</Label.Thin300>
					</Flex>
					<Flex gap="1" align="center">
						<Label.Mid600 className="overflow-ellipsis w-60 text-left">
							Price:
						</Label.Mid600>
						<DollarSign size={20} />
						<Label.Thin300 className="overflow-ellipsis">
							{price}
						</Label.Thin300>
					</Flex>
					<Flex gap="2" align="center">
						<Label.Big600 className="w-40 text-left">
							Rating:{" "}
						</Label.Big600>
						{/* <Star color="yellow" fill="yellow" size={32} />
								<Label.Mid500 className="overflow-ellipsis">
									{avgRating}
								</Label.Mid500> */}
						<Flex className="flex-col items-start">
							<Rating
								value={displayValue}
								ratingType={ratingType.DETAILS}
								interactive={true} //TODO: Get Value from loading details API
								onChange={(value) => handleRatingChange(value)}
							/>
							<p
								id="confirmation"
								className="flex-basis-full mt-0 ml-60 text-left hidden z-10 absolute bg-green-500 text-white p-2 rounded-lg"
							>
								Saved
							</p>
						</Flex>
					</Flex>
					<Flex gap="1" align="center">
						<Label.Mid600 className="overflow-ellipsis w-60 text-left">
							Availablity:
						</Label.Mid600>
						<Star color="yellow" fill="yellow" size={20} />
						<Label.Thin300 className="overflow-ellipsis">
							{availability}
						</Label.Thin300>
					</Flex>
					<Flex gap="1" align="center">
						<Label.Mid600 className="overflow-ellipsis w-60 text-left">
							Number of bookings:
						</Label.Mid600>
						<Label.Thin300 className="overflow-ellipsis">
							{numberOfBookings}
						</Label.Thin300>
					</Flex>
					<Flex gap="1" align="center">
						<Label.Mid600 className="overflow-ellipsis w-60 text-left">
							Language:
						</Label.Mid600>
						<Label.Thin300 className="overflow-ellipsis">
							{languageOptions?.find(
								(option) => option.value === language,
							)?.label ?? language}
						</Label.Thin300>
					</Flex>
					<Flex
						gap="2"
						align="center"
						justify="start"
						className="w-full"
					>
						<Label.Mid600 className="overflow-ellipsis w-60 text-left">
							Activities:
						</Label.Mid600>
						{activities && activities?.length > 0 ? (
							<Flex
								gap="1"
								align="center"
								className="overflow-x-scroll w-full h-8"
							>
								{activities?.map((activity) => (
									<Badge
										key={activity?.title}
										variant={"default"}
										className="whitespace-nowrap"
									>
										{activity?.title}
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
						<Label.Mid600 className="w-60 text-left">
							Tags:
						</Label.Mid600>
						{tags && tags?.length > 0 ? (
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
			</Card>
		</Flex>
	);
}
