import { formatDate } from "date-fns";
import { ArrowLeft, DollarSign, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	useBookItinerary,
	useCancelItineraryBooking,
	useItinerary,
} from "@/api/data/useItineraries";
import { useTouristProfile } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Flex } from "@/components/ui/flex";
import Rating, { ratingType } from "@/components/ui/rating";
import ReviewOverlay from "@/components/ui/reviewOverlay";
import useCurrency from "@/hooks/useCurrency";
import { useLoginStore } from "@/store/loginStore";
import { languageOptions } from "@/types/consts";
import { EAccountType } from "@/types/enums";
import { TTourGuide, TTourist } from "@/types/global";

export default function ItineraryDetails() {
	const navigate = useNavigate();
	const convertCurrency = useCurrency();
	const { user } = useLoginStore();
	const { data: userProfile, refetch: refetchUserProfile } =
		useTouristProfile();

	const { data, refetch } = useItinerary();
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
		tourists,
	} = data || {};
	const { doBookItinerary } = useBookItinerary(() => {
		refetch();
		refetchUserProfile();
	});
	const { doCancelItineraryBooking } = useCancelItineraryBooking(() => {
		refetch();
		refetchUserProfile();
	});

	const tourGuideName = (data?.createdBy as unknown as TTourGuide)?.name
		? (data?.createdBy as unknown as TTourGuide)?.name
		: (data?.createdBy as unknown as TTourGuide)?.username;

	useEffect(() => {
		console.log("Guide From Profile:", userProfile);
		console.log("Guide From Itinerary:", data);
		setCanReviewItinerary(
			!!(
				user?.type === EAccountType.Tourist &&
				data?.tourists?.includes(user?._id) &&
				data?.endDateTime.localeCompare(new Date().toISOString()) === -1
			),
		);
		setCanReviewGuide(
			!!(
				(
					user?.type === EAccountType.Tourist &&
					userProfile?.bookedItineraries?.some(
						(bookedItinerary) =>
							bookedItinerary.createdBy ===
							(data?.createdBy as unknown as TTourGuide)?._id,
					) &&
					data?.endDateTime.localeCompare(
						new Date().toISOString(),
					) === -1
				) // 1 if endDateTime is after now, -1 if endDateTime is before now, 0 if they are equal
			),
		);
	}, [user, userProfile, data]);

	console.log(data?.endDateTime);
	console.log(new Date().toISOString());
	console.log(data?.endDateTime.localeCompare(new Date().toISOString())); // 1 if endDateTime is after now, -1 if endDateTime is before now, 0 if they are equal
	const [canReviewItinerary, setCanReviewItinerary] = useState(false);
	const [canReviewGuide, setCanReviewGuide] = useState(false);
	//TODO: Discuss how to adjust so the itineraries attended are the ones that can be reviewed, not any booked one

	const childRef = useRef<{ postReview: () => void }>(null);

	const saveReview = () => {
		if (childRef.current) childRef.current.postReview();
	};

	return (
		<Flex
			justify="center"
			align="center"
			className="p-4 overflow-y-scroll w-full h-full"
		>
			<Card className="w-[80%] border-black border-2">
				<CardHeader>
					<Flex justify="between" align="center">
						<Flex gap="2" align="center">
							<ArrowLeft
								className="cursor-pointer"
								onClick={() => navigate("/itineraries")}
								size={32}
							/>
							<Label.Big600>{title}</Label.Big600>
						</Flex>
						{user?.type === EAccountType.Tourist &&
							(tourists?.includes(user?._id) ? (
								<Button
									size="lg"
									onClick={() => {
										if (data?._id)
											doCancelItineraryBooking(data?._id);
									}}
								>
									Cancel
								</Button>
							) : (
								<Button
									size="lg"
									onClick={() => {
										if (data?._id)
											doBookItinerary(data?._id);
									}}
								>
									Book
								</Button>
							))}
					</Flex>
				</CardHeader>
				<CardContent className="grid grid-cols-2 w-full">
					<Flex
						isColumn
						gap="3"
						align="center"
						className="w-full border-r border-solid pr-2"
					>
						<Flex gap="2" isColumn>
							<Label.Thin300>Pickup:</Label.Thin300>
							<Flex gap="2" align="center">
								<MapPin size={20} />
								<Label.Mid500>{pickUpLocation}</Label.Mid500>
							</Flex>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Dropoff:</Label.Thin300>
							<Flex gap="2" align="center">
								<MapPin size={20} />
								<Label.Mid500>{dropOffLocation}</Label.Mid500>
							</Flex>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Start time:</Label.Thin300>
							<Label.Mid500>
								{startDateTime &&
									formatDate(
										new Date(startDateTime),
										"dd/MM/yyyy HH:mm:ss a",
									)}
							</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>End time:</Label.Thin300>
							<Label.Mid500>
								{endDateTime &&
									formatDate(
										new Date(endDateTime),
										"dd/MM/yyyy HH:mm:ss a",
									)}
							</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Price:</Label.Thin300>
							<Flex gap="2" align="center">
								<DollarSign size={20} />
								<Label.Mid500>
									{convertCurrency(price)}
								</Label.Mid500>
							</Flex>
						</Flex>
						<Flex gap="2" isColumn align="center">
							<Label.Thin300>Rating:</Label.Thin300>
							<Flex>
								<Rating
									value={avgRating}
									ratingType={ratingType.DETAILS}
									interactive={false}
								/>
								{canReviewItinerary && (
									<Dialog>
										<DialogTrigger className="bg-surface-primary ml-4 px-3 rounded-md">
											Review Itinerary
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>
													Review this Itinerary
												</DialogTitle>
												<DialogDescription>
													<ReviewOverlay
														reviewType="Itinerary"
														reviewedItemId={
															data?._id
														}
														userId={user?._id}
														ref={childRef}
													/>
												</DialogDescription>
											</DialogHeader>
											<DialogFooter className="sm:justify-center">
												<Button
													type="submit"
													onClick={() => saveReview()}
													className="mr-2"
												>
													Save Review
												</Button>
												<DialogClose asChild>
													<Button
														type="button"
														variant="secondary"
														className="ml-2"
													>
														Close
													</Button>
												</DialogClose>
											</DialogFooter>
										</DialogContent>
									</Dialog>
								)}
							</Flex>
						</Flex>
					</Flex>
					<Flex
						isColumn
						gap="3"
						align="center"
						className="w-full border-r border-solid pr-2"
					>
						<Flex gap="2" isColumn>
							<Label.Thin300>Availablity:</Label.Thin300>
							<Label.Mid500>{availability}</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Number of bookings:</Label.Thin300>
							<Label.Mid500>{numberOfBookings}</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Language:</Label.Thin300>
							<Label.Mid500>
								{languageOptions?.find(
									(option) => option.value === language,
								)?.label ?? language}
							</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn align="center">
							<Label.Thin300>Activities:</Label.Thin300>
							{activities && activities?.length > 0 ? (
								<Flex
									gap="1"
									align="center"
									justify="center"
									className="overflow-x-scroll h-8 w-full"
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
						<Flex gap="2" isColumn align="center">
							<Label.Thin300>Tags:</Label.Thin300>
							{tags && tags?.length > 0 ? (
								<Flex
									gap="1"
									align="center"
									justify="center"
									className="overflow-x-scroll h-8 w-full"
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
						<Flex gap="2" isColumn align="center">
							<Label.Thin300>Tour Guide:</Label.Thin300>
							{tags && tags?.length > 0 ? (
								<Flex
									gap="1"
									align="center"
									justify="center"
									className="overflow-x-scroll h-8 w-full"
								>
									<Label.Mid500>{tourGuideName}</Label.Mid500>

									{canReviewGuide && (
										<Dialog>
											<DialogTrigger className="bg-surface-primary ml-4 px-3 rounded-md">
												Review Guide
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>
														Review this Itinerary's
														Tour Guide:{" "}
														{tourGuideName}
													</DialogTitle>
													<DialogDescription>
														<ReviewOverlay
															reviewType="TourGuide"
															reviewedItemId={
																(
																	data?.createdBy as unknown as TTourGuide
																)?._id
															}
															userId={user?._id}
															ref={childRef}
														/>
													</DialogDescription>
												</DialogHeader>
												<DialogFooter className="sm:justify-center">
													<Button
														type="submit"
														onClick={() =>
															saveReview()
														}
														className="mr-2"
													>
														Save Review
													</Button>
													<DialogClose asChild>
														<Button
															type="button"
															variant="secondary"
															className="ml-2"
														>
															Close
														</Button>
													</DialogClose>
												</DialogFooter>
											</DialogContent>
										</Dialog>
									)}
								</Flex>
							) : (
								"No tags"
							)}
						</Flex>
					</Flex>
				</CardContent>
			</Card>
		</Flex>
	);
}
