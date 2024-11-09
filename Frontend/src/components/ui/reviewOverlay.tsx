import axios from "axios";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";

import { Flex } from "./flex";
import Rating, { ratingType } from "./rating";

interface ReviewOverlayProps {
	reviewType: string;
	reviewedItemId?: string;
	userId?: string;
}

export interface ReviewOverlayHandle {
	showOverlay: () => void;
}

export const ReviewOverlay: React.FC<ReviewOverlayProps> = forwardRef<
	ReviewOverlayHandle,
	ReviewOverlayProps
>(({ reviewType, reviewedItemId, userId }, ref) => {
	const [rating, setRating] = React.useState<number>(0);
	const [visible, setVisible] = React.useState<boolean>(false);

	useEffect(() => {
		//fetch this user's review from the server

		const fetchReview = async () => {
			if (!reviewedItemId || !userId) return;
			try {
				const res = await axios.get(
					"http://localhost:5000/api/reviews/showReview", //TODO: change this to the actual endpoint
					{
						params: {
							userId: userId,
							reviewType: reviewType,
							reviewedItemId: reviewedItemId,
						},
					},
				);

				setRating(res.data.rating);
				const comment = document.getElementById("commentInput");
				if (comment) {
					comment.innerText = res.data.comment;
				}
			} catch (error) {
				console.error(error);
			}
		};
		try {
			fetchReview();
		} catch (error) {
			console.error(error);
		}
	});

	useImperativeHandle(ref, () => ({
		showOverlay: () => {
			console.log("showing overlay");
			setVisible(true);
		},
	}));

	if (!visible) {
		return null;
	}

	const postReview = async () => {
		//post review to the server
		console.log("posting review");
		try {
			await axios.post("http://localhost:5000/api/reviews/addReview", {
				userId: userId,
				reviewType: reviewType,
				reviewedItemId: reviewedItemId,
				rating: rating,
				comment: document.getElementById("commentInput")?.innerText,
			});

			//Show "Review Saved" Prompt in frontend
			await new Promise((resolve) => setTimeout(resolve, 0.5));
			hideOverlay();
		} catch (error) {
			console.error(error);
		}
	};

	const hideOverlay = () => {
		//hide the overlay
		setVisible(false);
		console.log("hiding overlay");
	};

	return (
		<Flex
			className="z-50 fixed top-0 left-0 w-screen h-screen bg-slate-700 bg-opacity-45"
			justify="center"
			isColumn
			align="center"
		>
			<Flex
				className="p-12 w-4/12 h-2/6 bg-slate-700 bg-opacity-90 rounded-xl"
				isColumn
				align="center"
				justify="center"
			>
				<Rating
					ratingType={ratingType.REVIEW}
					value={rating}
					interactive={true}
					onChange={(value) => setRating(value)}
				/>
				<textarea
					className="w-11/12 bg-gray-400 rounded-md px-2 h-1/2 my-6 py-1"
					id="commentInput"
				></textarea>
				<Flex className="w-8/12 self-center" justify="center">
					<button
						className="mx-10 bg-green-500 text-white rounded-md p-2"
						onClick={() => postReview()}
					>
						Submit
					</button>
					<button
						className="mx-10 bg-red-400 text-white rounded-md p-2"
						onClick={() => hideOverlay()}
					>
						Cancel
					</button>
				</Flex>
			</Flex>
		</Flex>
	);
});

export default ReviewOverlay;
