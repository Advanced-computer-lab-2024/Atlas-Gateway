import { Star } from "lucide-react";
import React from "react";

export enum ERatingType {
	DETAILS = 40,
	CARDS = 20,
}

interface RatingProps {
	value?: number;
	onChange?: (value: number) => void;
	ratingType?: ERatingType;
	interactive?: boolean;
}

const Rating: React.FC<RatingProps> = ({

	value = 0,
	ratingType = ERatingType.CARDS,

	interactive: interactive = false,
	onChange,
}) => {
	const [hoverValue, setHoverValue] = React.useState<number | null>(null);
	const displayValue: number = hoverValue !== null ? hoverValue : value;
	const hoverClass = "hover:scale-125";
	const handleMouseEnter = (index: number, event: React.MouseEvent) => {
		if (interactive) {
			setHoverValue(index + 1);

			event.currentTarget.classList.add(hoverClass);
		}
	};

	const handleMouseLeave = (event: React.MouseEvent) => {
		if (interactive) {
			event.currentTarget.classList.remove(hoverClass);
		}
	};

	const handleClick = (index: number) => {
		if (interactive) {
			onChange(index + 1);
			//send rating request to server
			//Show "Rating Saved" Prompt in frontend
		}
	};

	const rateLeave = () => {
		if (interactive) {
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
					onClick={() => handleClick(i)}
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
					onClick={() => handleClick(Math.floor(displayValue))}
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
					onClick={() => handleClick(displayValue + i)}
				/>
			))}
		</div>
	);
};

export default Rating;
