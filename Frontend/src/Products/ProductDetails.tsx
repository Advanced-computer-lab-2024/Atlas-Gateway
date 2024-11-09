import axios from "axios";
import { ArrowLeft, Package } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProduct } from "@/api/data/useProducts";
import { useTouristProfile } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CommentsContainer } from "@/components/ui/comments";
import { Flex } from "@/components/ui/flex";
import Rating, { ratingType } from "@/components/ui/rating";
import ReviewOverlay from "@/components/ui/reviewOverlay";
import useCurrency from "@/hooks/useCurrency";
import { EAccountType } from "@/types/enums";

export default function ProductDetails() {
	const navigate = useNavigate();
	const { data } = useProduct();
	const convertCurrency = useCurrency();
	const {
		name,
		description,
		price,
		imagePath,
		avgRating,
		quantity,
		sales,
		sellerId,
	} = data || {};

	const [displayValue, setDisplayValue] = React.useState<number | undefined>(
		0,
	);

	const [fetchedComments, setFetchedComments] = useState<string[]>([]);

	const { data: user } = useTouristProfile();

	const [productPic, setProductPic] = useState("");

	const handleDownload = async (filePath: string) => {
		try {
			axios
				.post(`http://localhost:5000/api/media/download`, { filePath })
				.then((res) => {
					setProductPic(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	};

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

	useEffect(() => {
		handleDownload(imagePath || "");
	}, [imagePath]);

	const canViewSales =
		user?.type === sellerId || user?.type === EAccountType.Admin;

	return (
		<Flex
			justify="center"
			align="center"
			className="p-4 overflow-y-scroll w-full h-full"
		>
			<ReviewOverlay
				reviewType="Product"
				reviewedItemId={data?._id}
				userId={user?._id}
				ref={childRef}
			/>
			<Card className="w-[80%] border-black border-2">
				<CardHeader>
					<Flex gap="2" align="center">
						<ArrowLeft
							className="cursor-pointer"
							onClick={() => navigate("/products")}
							size={32}
						/>
						<Label.Big600>{name}</Label.Big600>
					</Flex>
				</CardHeader>
				<CardContent>
					<Flex gap="8">
						<Flex
							align="center"
							justify="center"
							className="w-[600px] h-[400px] bg-gray-200 rounded-xl"
						>
							{!productPic ? (
								<Package className="w-20 h-20" />
							) : (
								<img
									src={productPic}
									alt="Product Picture"
									className="object-contain w-full h-full"
								/>
							)}
						</Flex>
						<Flex gap="3" isColumn align="start">
							<Label.Big500>Product info</Label.Big500>
							<Flex gap="2" isColumn>
								<Label.Thin300>
									Quantity Available
								</Label.Thin300>
								<Label.Mid500 className="overflow-ellipsis">
									{quantity}
								</Label.Mid500>
							</Flex>
							<Flex gap="2" isColumn>
								<Label.Thin300>Price:</Label.Thin300>
								<Label.Mid500 className="overflow-ellipsis">
									{avgRating}
								</Label.Mid500>
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
							{canViewSales && (
								<Flex gap="2" isColumn>
									<Label.Thin300>Sales:</Label.Thin300>
									<Label.Mid500 className="overflow-ellipsis">
										{sales}
									</Label.Mid500>
								</Flex>
							)}
							<Flex isColumn gap="2" align="start">
								<Label.Thin300 className="w-40 text-left">
									Description:
								</Label.Thin300>
								<Label.Mid500>{description}</Label.Mid500>
							</Flex>
						</Flex>
					</Flex>
				</CardContent>
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
