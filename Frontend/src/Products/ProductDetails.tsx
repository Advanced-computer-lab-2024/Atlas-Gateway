import axios from "axios";
import { delay, set } from "lodash";
import { ArrowLeft, Currency, Package } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { promise } from "zod";

import Product from "@/Admin/Product/Product";
import { useProduct } from "@/api/data/useProducts";
import { useTouristProfile } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
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
import Rating, { ratingType } from "@/components/ui/rating";
import ReviewOverlay from "@/components/ui/reviewOverlay";
import useCurrency from "@/hooks/useCurrency";
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";
import { TReview } from "@/types/global";

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

	const [fetchedComments, setFetchedComments] = useState<TReview[]>([]);
	const [moreCommentsAvailable, setMoreCommentsAvailable] = useState(true);
	const [toggleToGetComments, setToggleToGetComments] = useState(false);

	const { user } = useLoginStore();
	const { data: userProfile } = useTouristProfile();
	//console.log(userProfile);

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
		userProfile?.purchaseProducts.includes(data ? data._id : "");

	const childRef = useRef<{ postReview: () => void }>(null);

	const callUseEffect = () => {
		setToggleToGetComments(!toggleToGetComments);
	};

	useEffect(() => {
		const fetchComments = async () => {
			const res = await axios.get(
				"http://localhost:5000/api/reviews/list",
				{
					params: {
						productId: data?._id,
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
	}, [data, toggleToGetComments]);

	const saveReview = async () => {
		const saveResult = document.getElementById("saveResult");
		if (saveResult) {
			saveResult.innerText = "Saving...";
			saveResult.hidden = false;
		}
		if (childRef.current) {
			childRef.current.postReview();
		}
		delay(() => {
			callUseEffect();
			if (saveResult) {
				saveResult.classList.remove("bg-blue-400");
				saveResult.classList.add("bg-green-400");
				saveResult.innerText = "Done!";
			}
		}, 1500);

		delay(() => {
			if (saveResult) {
				saveResult.classList.remove("bg-green-400");
				saveResult.classList.add("bg-blue-400");
				saveResult.hidden = true;
			}
		}, 3000);
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
			isColumn
		>
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
									{price}
								</Label.Mid500>
							</Flex>
							<Flex gap="2" isColumn align="start">
								<Label.Thin300>Rating:</Label.Thin300>
								<Flex>
									<Rating
										value={avgRating}
										ratingType={ratingType.DETAILS}
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
															reviewType="Product"
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
				comments={fetchedComments}
				moreAvailable={moreCommentsAvailable}
				showMore={() => callUseEffect()}
			/>
		</Flex>
	);
}
