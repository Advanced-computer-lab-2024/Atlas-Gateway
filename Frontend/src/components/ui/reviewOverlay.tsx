import axios from "axios";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";

import { Flex } from "./flex";
import Rating, { ERatingType } from "./rating";

interface ReviewOverlayProps {
	reviewType: string;
	reviewedItemId?: string;
	userId?: string;
}

export interface ReviewOverlayHandle {
	postReview: () => void;
}

export const ReviewOverlay: React.FC<ReviewOverlayProps> = forwardRef<
	ReviewOverlayHandle,
	ReviewOverlayProps
>(({ reviewType, reviewedItemId, userId }, ref) => {
	const [rating, setRating] = React.useState<number>(0);

	// useEffect(() => {
	// 	//fetch this user's review from the server

	// 	const fetchReview = async () => {
	// 		if (!reviewedItemId || !userId) return;
	// 		try {
	// 			const res = await axios.get(
	// 				"http://localhost:5000/api/reviews/showReview", //TODO: change this to the actual endpoint
	// 				{
	// 					params: {
	// 						userId: userId,
	// 						reviewType: reviewType,
	// 						reviewedItemId: reviewedItemId,
	// 					},
	// 				},
	// 			);

	// 			setRating(res.data.rating);
	// 			const comment = document.getElementById("commentInput");
	// 			if (comment) {
	// 				comment.innerText = res.data.comment;
	// 			}
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};
	// 	try {
	// 		fetchReview();
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// });

	useImperativeHandle(ref, () => ({
		postReview: () => {
			postReview();
			console.log("Review Saved");
		},
	}));

	const postReview = async () => {
		//post review to the server
		console.log("posting review");
		try {
			await axios.post("http://localhost:5000/api/reviews/add", {
				userId: userId,
				itemType: reviewType,
				reviewedItem: reviewedItemId,
				rating: rating,
				text: (
					document.getElementById(
						"commentInput",
					) as HTMLTextAreaElement
				)?.value,
			});

			//Show "Review Saved" Prompt in frontend
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Flex className="" isColumn align="center" justify="center">
			<Rating
				ratingType={ERatingType.DETAILS}
				value={rating}
				interactive={true}
				onChange={(value) => setRating(value)}
			/>
			<textarea
				className="w-11/12 bg-gray-400 rounded-md px-2 h-3/4 my-6 py-1 resize-none text-auto"
				id="commentInput"
			/>
			{/* <Flex className="w-8/12 self-center" justify="center">
				<button
					className="mx-10 bg-green-500 text-white rounded-md p-2"
					onClick={() => postReview()}
				>
					Submit
				</button>
			</Flex> */}
		</Flex>
	);
});

export default ReviewOverlay;
