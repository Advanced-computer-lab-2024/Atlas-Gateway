import { Star } from "lucide-react";
import React from "react";

export enum ratingType {
	DETAILS = 40,
	CARDS = 10,
}

interface RatingProps {
	value: number;
	onChange?: (value: number) => void | null;
	ratingType?: ratingType;
	interactable?: boolean;
}

const Rating: React.FC<RatingProps> = ({
	value,
	ratingType = ratingType.CARDS,
	interactable = false,
	onChange,
}) => {
	const [hoverValue, setHoverValue] = React.useState<number | null>(null);
	const displayValue: number = hoverValue !== null ? hoverValue : value;
	const hoverClass = "hover:scale-125";
	const handleMouseEnter = (index: number, event: React.MouseEvent) => {
		if (interactable) {
			setHoverValue(index + 1);

			event.currentTarget.classList.add(hoverClass);
		}
	};

	const handleMouseLeave = (event: React.MouseEvent) => {
		if (interactable) {
			event.currentTarget.classList.remove(hoverClass);
		}
	};

	const handleClick = (index: number, event: React.MouseEvent) => {
		if (interactable) {
			onChange(index + 1);
			//send rating request to server
			//Show "Rating Saved" Prompt in frontend
		}
	};

	const rateLeave = () => {
		if (interactable) {
			setHoverValue(null);
		}
	};

	const starSize = ratingType?.valueOf();
	return (
		<div className="rating flex" onMouseLeave={() => rateLeave()}>
			{Array.from({ length: displayValue }, (_, i) => (
				<Star
					className="mx-1"
					key={i}
					color="yellow"
					strokeWidth={1}
					fill="yellow"
					size={starSize}
					onMouseEnter={(e) => handleMouseEnter(i, e)}
					onMouseLeave={(e) => handleMouseLeave(e)}
					onClick={(e) => handleClick(i, e)}
				/>
			))}

			{displayValue % 1 !== 0 ? (
				<div
					className="relative mx-1"
					key={Math.floor(displayValue)}
					style={{ width: starSize, height: starSize }}
					onMouseEnter={(e) =>
						handleMouseEnter(Math.floor(displayValue), e)
					}
					onMouseLeave={(e) => handleMouseLeave(e)}
					onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
						handleClick(Math.floor(displayValue), e)
					}
				>
					<Star
						className="absolute top-0 left-0 z-10 "
						color="yellow"
						strokeWidth={1}
						fill="yellow"
						size={starSize}
						style={{
							clipPath: `inset(0 ${100 - (value % 1) * 100}% 0 0)`,
						}}
					/>
					<Star
						className="absolute top-0 left-0"
						color="gray"
						strokeWidth={1}
						fill="white"
						size={starSize}
						style={{
							clipPath: `inset(0 0 0 ${(value % 1) * 100}%)`,
						}}
					/>
				</div>
			) : null}

			{Array.from({ length: 5 - displayValue }, (_, i) => (
				<Star
					className="mx-1"
					key={displayValue + i}
					color="gray"
					strokeWidth={1}
					fill="white"
					size={starSize}
					onMouseEnter={(e) => handleMouseEnter(displayValue + i, e)}
					onMouseLeave={(e) => handleMouseLeave(e)}
					onClick={(e) => handleClick(displayValue + i, e)}
				/>
			))}
		</div>
	);
};

export default Rating;
