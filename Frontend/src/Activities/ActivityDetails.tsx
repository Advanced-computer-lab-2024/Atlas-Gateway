import axios from "axios";
import { formatDate } from "date-fns";
import { ArrowLeft, Bookmark, DollarSign, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	useActivity,
	useBookActivity,
	useBookmarkActivity,
	useCancelActivityBooking,
	useRemoveBookmarkActivity,
} from "@/api/data/useActivities";
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
import { EAccountType } from "@/types/enums";
import { TReview } from "@/types/global";

export default function ActivityDetails() {
	const navigate = useNavigate();
	const convertCurrency = useCurrency();
	const { user } = useLoginStore();
	const { data, refetch } = useActivity();
	const { doBookActivity } = useBookActivity(() => {
		refetch();
	});
	const { doCancelActivityBooking } = useCancelActivityBooking(() => {
		refetch();
	});

	const { doBookmarkActivity } = useBookmarkActivity(() => {
		refetch();
	});
	const { doRemoveBookmarkActivity } = useRemoveBookmarkActivity(() => {
		refetch();
	});

	const {
		name,
		categories,
		dateTime,
		specialDiscounts,
		isOpen,
		location,
		maxPrice,
		minPrice,
		avgRating,
		tags,
		tourists,
		touristBookmarks,
	} = data || {};

	const [canReview, setCanReview] = useState(false);
	const [fetchedComments, setFetchedComments] = useState<TReview[]>([]);
	const [moreCommentsAvailable, setMoreCommentsAvailable] = useState(true);
	const [toggleToGetComments, setToggleToGetComments] = useState(false);

	useEffect(() => {
		setCanReview(
			!!(
				user?.type === EAccountType.Tourist &&
				data?.tourists?.includes(user?._id) &&
				data?.dateTime.localeCompare(new Date().toISOString()) === -1
			),
		);

		const fetchComments = async () => {
			const res = await axios.get(
				"http://localhost:5000/api/reviews/list",
				{
					params: {
						activityId: data?._id,
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
	}, [data, user, toggleToGetComments]);

	const childRef = useRef<{ postReview: () => void }>(null);

	const callUseEffect = () => {
		setToggleToGetComments(!toggleToGetComments);
	};

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
								onClick={() => navigate("/activities")}
								size={32}
							/>
							<Label.Big600>{name}</Label.Big600>
						</Flex>
						<Flex>
							{user?.type === EAccountType.Tourist &&
								(tourists?.includes(user?._id) ? (
									<Button
										size="lg"
										onClick={() => {
											if (data?._id) {
												doCancelActivityBooking(
													data?._id,
												);
											}
										}}
									>
										Cancel
									</Button>
								) : (
									<Button
										size="lg"
										onClick={() => {
											if (data?._id) {
												doBookActivity(data?._id);
											}
										}}
									>
										Book
									</Button>
								))}
						</Flex>
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
							<Label.Thin300>Location</Label.Thin300>
							<Flex gap="2" align="center">
								<Label.Mid500 className="overflow-ellipsis">
									{location}
								</Label.Mid500>
								<MapPin size={24} />
							</Flex>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Date & Time</Label.Thin300>
							<Label.Mid500 className="overflow-ellipsis">
								{dateTime &&
									formatDate(
										new Date(dateTime),
										"dd/MM/yyyy, HH:mm:ss a",
									)}
							</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn align="center">
							<Label.Thin300>Rating:</Label.Thin300>
							<Flex>
								<Rating
									value={avgRating}
									ratingType={ERatingType.DETAILS}
									interactive={false}
								/>
								{canReview && (
									<Dialog>
										<DialogTrigger className="bg-surface-primary ml-4 px-3 rounded-md">
											Review Activity
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>
													Review this Activity
												</DialogTitle>
												<DialogDescription>
													<ReviewOverlay
														reviewType="Activity"
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
									id="saveResult"
									hidden={true}
									className="ml-5 rounded-md p-2 bg-blue-400"
								>
									Saving...
								</p>
							</Flex>
						</Flex>
						<Flex gap="2" isColumn>
							<Label.Thin300>Price</Label.Thin300>
							<Flex gap="2" align="center">
								<DollarSign size={20} />
								<Label.Mid500 className="overflow-ellipsis">
									{convertCurrency(minPrice)} -{" "}
									{convertCurrency(maxPrice)}
								</Label.Mid500>
							</Flex>
						</Flex>
					</Flex>

					<Flex
						isColumn
						gap="4"
						className="w-full border-r border-solid pr-2"
					>
						<Flex gap="2" isColumn>
							<Label.Thin300>Special discounts</Label.Thin300>
							<Label.Mid500 className="overflow-ellipsis">
								{specialDiscounts}%
							</Label.Mid500>
						</Flex>
						<Flex gap="2" isColumn align="center">
							<Label.Thin300>Category:</Label.Thin300>
							<Flex
								gap="1"
								align="center"
								justify="center"
								className="overflow-x-scroll h-8 w-full"
							>
								<Badge
									key={categories?.[0]?._id}
									variant={"default"}
									className="whitespace-nowrap"
								>
									{categories?.[0]?.name}
								</Badge>
							</Flex>
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
						<Flex gap="2" isColumn>
							<Label.Thin300>Available to book</Label.Thin300>
							<Label.Thin300 className="overflow-ellipsis">
								{isOpen ? "Yes" : "No"}
							</Label.Thin300>
						</Flex>
					</Flex>
					<Flex>
						{user?.type === EAccountType.Tourist &&
							(touristBookmarks?.includes(user?._id) ? (
								<Bookmark
									fill="black"
									onClick={() => {
										if (data?._id) {
											doRemoveBookmarkActivity(data?._id);
										}
									}}
								/>
							) : (
								<Bookmark
									onClick={() => {
										if (data?._id) {
											doBookmarkActivity(data?._id);
										}
									}}
								/>
							))}
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
