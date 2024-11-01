import { transform } from "lodash";
import { Star, StarHalf } from "lucide-react";
import React from "react";

let starSize = 40;

interface RatingProps {
	value: number;
	onchange?: (value: number) => void | null;
}

const Rating: React.FC<RatingProps> = ({ value }) => {
	return (
		<div className="rating flex">
			{Array.from({ length: value }, (_, i) => (
				<Star
					className="mx-1"
					key={i}
					color="yellow"
					strokeWidth={1}
					fill="yellow"
					size={starSize}
				/>
			))}

			{value % 1 !== 0 ? (
				<div
					className="relative mx-1"
					style={{ width: starSize, height: starSize }}
				>
					<Star
						className="absolute top-0 left-0 z-10"
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

			{Array.from({ length: 5 - value }, (_, i) => (
				<Star
					className="mx-1"
					key={value + i}
					color="gray"
					strokeWidth={1}
					fill="white"
					size={starSize}
				/>
			))}
		</div>
	);
};

export default Rating;
