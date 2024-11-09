import axios from "axios";
import { ArrowLeft, DollarSign, LocateIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useProduct } from "@/api/data/useProducts";
import { useTouristProfile } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Card } from "@/components/ui/card";
import { CommentsContainer } from "@/components/ui/comments";
import { Flex } from "@/components/ui/flex";
import Rating, { ratingType } from "@/components/ui/rating";
import ReviewOverlay from "@/components/ui/reviewOverlay";
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";
import { TComment } from "@/types/global";

export default function ProductDetails() {
	const navigate = useNavigate();
	const { data } = useProduct();
	//TODO: Check if user is eligible to rate the product
	const { name, description, images, price, avgRating, availability } =
		data || {};
	const [displayValue, setDisplayValue] = React.useState<number | undefined>(
		0,
	);

	const [fetchedComments, setFetchedComments] = React.useState<TComment[]>(
		[],
	);

	const { data: user } = useTouristProfile();

	const canReview =
		user?.type === EAccountType.Tourist &&
		user.purchasedProducts.includes(data ? data._id : "");

	const childRef = useRef<{ showOverlay: () => void }>(null);

	const fetchComments = async () => {
		const res = await axios.get(
			"http://localhost:5000/api/products/getComments",
			{
				params: {
					productId: data?._id,
					skipCount: fetchedComments.length,
				},
			},
		);

		//concatenate the new comments with the old ones
		setFetchedComments([...fetchedComments, ...res.data]);
	};

	useEffect(() => {
		try {
			fetchComments();
		} catch (error) {
			console.error(error);
		}

		setDisplayValue(avgRating || 0);
	}, [avgRating, fetchComments]);

	const showOverlay = () => {
		if (childRef.current) childRef.current.showOverlay();
	};

	return (
		<Flex
			isColumn
			gap="4"
			align="center"
			className="px-4 py-4 overflow-y-scroll"
		>
			<ReviewOverlay
				reviewType="Product"
				reviewedItemId={data?._id}
				userId={user?._id}
				ref={childRef}
			/>
			<Card className="w-[80%] flex-col border-surface-secondary border-2 p-4">
				<Flex isColumn gap="4">
					<Flex gap="2" align="center">
						<ArrowLeft
							className="cursor-pointer"
							onClick={() => navigate("/products")}
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
							<Flex gap="2" align="center">
								<Label.Big600 className="w-40 text-left">
									Description:{" "}
								</Label.Big600>
								<Label.Mid500>{description}</Label.Mid500>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-40 text-left">
									Availability:{" "}
								</Label.Big600>
								<Label.Mid500>{availability}</Label.Mid500>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-40 text-left">
									Price:{" "}
								</Label.Big600>
								<DollarSign size={32} />
								<Label.Mid500 className="overflow-ellipsis">
									{price}
								</Label.Mid500>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-40 text-left">
									Rating:{" "}
								</Label.Big600>
								{/* <Star color="yellow" fill="yellow" size={32} />
								<Label.Mid500 className="overflow-ellipsis">
									{avgRating}
								</Label.Mid500> */}

								<Flex>
									<Rating
										value={displayValue}
										ratingType={ratingType.DETAILS}
										interactive={false}
									/>
									{canReview && (
										<button
											onClick={() => showOverlay()}
											className="ml-6 px-3 rounded-md bg-surface-primary align-middle"
										>
											Review Product
										</button>
									)}
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Card>
			<CommentsContainer
				interactive={true}
				comments={[
					...[
						{
							_id: "x",
							user: {
								username: "user1",
								_id: "x1",
								email: "mail",
								mobile: "123",
								address: "address",
								currency: "USD",
								loyaltyPoints: 0,
								walletBalance: 0,
								type: EAccountType.Tourist,
								purchasedProducts: [],
							},
							text: "This is a comment",
							createdAt: "Yes",
						},
					], // These are dummy comments, the actual comments will be fetched from the DB TODO: Remove later
					...fetchedComments,
				]}
			/>
		</Flex>
	);
}
