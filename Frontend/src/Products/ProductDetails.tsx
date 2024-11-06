import axios from "axios";
import { ArrowLeft, DollarSign, LocateIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useProduct } from "@/api/data/useProducts";
import Label from "@/components/ui/Label";
import { Card } from "@/components/ui/card";
import { CommentsContainer } from "@/components/ui/comments";
import { Flex } from "@/components/ui/flex";
import Rating, { ratingType } from "@/components/ui/rating";
import { EAccountType } from "@/types/enums";
import { TComment } from "@/types/global";

export default function ProductDetails() {
	const navigate = useNavigate();
	const { data } = useProduct();
	const { name, description, images, price, avgRating, availability } =
		data || {};
	const [displayValue, setDisplayValue] = React.useState<number | undefined>(
		0,
	);

	const [fetchedComments, setFetchedComments] = React.useState<TComment[]>(
		[],
	);

	useEffect(() => {
		try {
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
			fetchComments();
		} catch (error) {
			console.error(error);
		}

		setDisplayValue(avgRating || 0);
	}, [avgRating, data?._id, fetchedComments]);

	const handleRatingChange = async (inputRating: number) => {
		try {
			const res = await axios.post(
				"http://localhost:5000/api/products/addRating",
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
							<Flex gap="2" align="center" justify="between">
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
								<Flex className="flex-col items-start">
									<Rating
										value={displayValue}
										ratingType={ratingType.DETAILS}
										interactive={true} //TODO: Get Value from loading details API
										onChange={(value) =>
											handleRatingChange(value)
										}
									/>
									<p
										id="confirmation"
										className="flex-basis-full mt-0 ml-60 text-left hidden z-10 absolute bg-green-500 text-white p-2 rounded-lg"
									>
										Saved
									</p>
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
							},
							text: "This is a comment",
							createdAt: "Yes",
						},
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
							},
							text: "This is a comment",
							createdAt: "Yes",
						},
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
							},
							text: "This is a comment",
							createdAt: "Yes",
						},
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
							},
							text: "This is a comment",
							createdAt: "Yes",
						},
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
							},
							text: "This is a comment",
							createdAt: "Yes",
						},
					],
					...fetchedComments,
				]}
			/>
		</Flex>
	);
}
