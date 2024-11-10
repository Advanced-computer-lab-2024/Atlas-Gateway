import React from "react";

import { TReview } from "@/types/global";

import { Card } from "./card";
import { Flex } from "./flex";
import Rating, { ERatingType } from "./rating";

interface commentsContainerProps {
	comments: TReview[]; // show more button loads more from the DB using the useState in the page itself
}

interface displayCommentsProps {
	comments: TReview[];
}

export const CommentsContainer: React.FC<commentsContainerProps> = ({
	comments,
}) => {
	//No-hierarchy comment section
	return (
		<Flex className="w-9/12 mt-10" justify="center">
			<div className="bg-gray-200 py-px px-2 w-10/12 rounded-md self-start">
				<DisplayComments comments={comments} />
			</div>
		</Flex>
	);
};

const DisplayComments: React.FC<displayCommentsProps> = ({ comments }) => {
	return (
		<div>
			{comments.map((comment) => (
				<Flex
					className="max-h-52 overflow-y-scroll flex-col  bg-gray-100 rounded-md p-4 mt-2 mb-2 scroll-py-2"
					justify="start"
				>
					<Flex justify="between" className="basis-full">
						<p>{comment.user.username}</p>
						<Rating
							value={comment.rating}
							ratingType={ERatingType.REVIEW}
						/>
					</Flex>
					<hr className="bg-gray-400 border-0 h-1 rounded-sm mt-2 mb-2" />
					<p className="self-start">{comment.text}</p>
				</Flex>
			))}
		</div>
	); //The actual comment display, max height and show more button
};
