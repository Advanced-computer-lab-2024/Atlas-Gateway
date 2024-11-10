import { formatDate } from "date-fns";
import { ArrowLeft, DollarSign, MapPin, Star } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
	useActivity,
	useBookActivity,
	useCancelActivityBooking,
} from "@/api/data/useActivities";
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
import Rating, { ERatingType } from "@/components/ui/rating";
import ReviewOverlay from "@/components/ui/reviewOverlay";
import useCurrency from "@/hooks/useCurrency";
import { EAccountType } from "@/types/enums";

export default function ActivityDetails() {
	const navigate = useNavigate();
	const convertCurrency = useCurrency();
	const { data: user } = useTouristProfile();
	const { data, refetch } = useActivity();
	const { doBookActivity } = useBookActivity(() => {
		refetch();
	});
	const { doCancelActivityBooking } = useCancelActivityBooking(() => {
		refetch();
	});

	const canReview =
		user?.type === EAccountType.Tourist &&
		user.bookedActivities.includes(data ? data._id : ""); //TODO: Discuss how to adjust so the activities attended are the ones that can be reviewed, not any booked one

	const childRef = useRef<{ postReview: () => void }>(null);

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
	} = data || {};

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
								onClick={() => navigate("/activities")}
								size={32}
							/>
							<Label.Big600>{name}</Label.Big600>
						</Flex>
						{user?.type === EAccountType.Tourist &&
							(tourists?.includes(user?._id) ? (
								<Button
									size="lg"
									onClick={() => {
										if (data?._id) {
											doCancelActivityBooking(data?._id);
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
											Review Product
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>
													Review this Product
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
							<Label.Thin300>Categories:</Label.Thin300>
							{categories && categories.length > 0 ? (
								<Flex
									gap="1"
									align="center"
									justify="center"
									className="overflow-x-scroll h-8 w-full"
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
								"No categories"
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
						<Flex gap="2" isColumn>
							<Label.Thin300>Available to book</Label.Thin300>
							<Label.Thin300 className="overflow-ellipsis">
								{isOpen ? "Yes" : "No"}
							</Label.Thin300>
						</Flex>
					</Flex>
				</CardContent>
			</Card>
		</Flex>
	);
}
