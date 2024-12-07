import axios from "axios";
import { formatDate } from "date-fns";
import { ArrowLeft, Bookmark, DollarSign, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	useBookItinerary,
	useBookmarkItinerary,
	useCancelItineraryBooking,
	useItinerary,
	useRemoveBookmarkItinerary,
} from "@/api/data/useItineraries";
import { useTouristProfile } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CommentsContainer } from "@/components/ui/comments";
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
import Rating, { ERatingType } from "@/components/ui/rating";
import ReviewOverlay from "@/components/ui/reviewOverlay";
import useCurrency from "@/hooks/useCurrency";
import { useLoginStore } from "@/store/loginStore";
import { languageOptions } from "@/types/consts";
import { EAccountType } from "@/types/enums";
import { TReview, TTourGuide } from "@/types/global";

import { PaymentSheet } from "./PaymentSheet";

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
		touristBookmarks,
	} = data || {};
	const { doCancelItineraryBooking } = useCancelItineraryBooking(() => {
		refetch();
		refetchUserProfile();
	});

	const { doBookmarkItinerary } = useBookmarkItinerary(refetch);
	const { doRemoveBookmarkItinerary } = useRemoveBookmarkItinerary(refetch);

	const [canReviewItinerary, setCanReviewItinerary] = useState(false);
	const [canReviewGuide, setCanReviewGuide] = useState(false);
	const [fetchedComments, setFetchedComments] = useState<TReview[]>([]);
	const [moreCommentsAvailable, setMoreCommentsAvailable] = useState(true);
	const [toggleToGetComments, setToggleToGetComments] = useState(false);

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

		const fetchComments = async () => {
			const res = await axios.get(
				"http://localhost:5000/api/reviews/list",
				{
					params: {
						itineraryId: data?._id,
						skipCount: fetchedComments.length,
					},
				},
			);

			//concatenate the new comments with the old ones
			setFetchedComments([...fetchedComments, ...res.data]);

			if (res.data.length < 10) {
				setMoreCommentsAvailable(false);
			}
		};
		try {
			fetchComments();
		} catch (error) {
			console.error(error);
		}
	}, [user, userProfile, data, toggleToGetComments]);

	const callUseEffect = () => {
		setToggleToGetComments(!toggleToGetComments);
	};

	//TODO: Discuss how to adjust so the itineraries attended are the ones that can be reviewed, not any booked one

	const childRef = useRef<{ postReview: () => void }>(null);

	const saveReview = async () => {
		if (childRef.current) {
			childRef.current.postReview();
		}
	};

	return (
		<Flex
			justify="center"
			align="center"
			isColumn
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
							<Flex>
								{user?.type === EAccountType.Tourist &&
									(touristBookmarks?.includes(user?._id) ? (
										<Bookmark
											fill="black"
											onClick={() => {
												if (data?._id) {
													doRemoveBookmarkItinerary(
														data?._id,
													);
												}
											}}
										/>
									) : (
										<Bookmark
											onClick={() => {
												if (data?._id) {
													doBookmarkItinerary(
														data?._id,
													);
												}
											}}
										/>
									))}
							</Flex>
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
								<PaymentSheet amount={convertCurrency(price)} />
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
									ratingType={ERatingType.DETAILS}
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
												<DialogClose asChild>
													<Button
														type="submit"
														onClick={() =>
															saveReview()
														}
														className="mr-2"
													>
														Save Review
													</Button>
												</DialogClose>
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
								<p
									id="saveResultItinerary"
									hidden={true}
									className="ml-5 rounded-md p-2 bg-blue-400"
								>
									Saving...
								</p>
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
													<DialogClose asChild>
														<Button
															type="submit"
															onClick={() =>
																saveReview()
															}
															className="mr-2"
														>
															Save Review
														</Button>
													</DialogClose>
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
									<p
										className="ml-5 rounded-md p-2 bg-blue-400"
										id="saveResultGuide"
										hidden={true}
									>
										Saving...
									</p>
								</Flex>
							) : (
								"No tags"
							)}
						</Flex>
					</Flex>
				</CardContent>
			</Card>
			<CommentsContainer
				comments={fetchedComments}
				moreAvailable={moreCommentsAvailable}
				showMore={() => callUseEffect()}
			/>
		</Flex>
	);
}
