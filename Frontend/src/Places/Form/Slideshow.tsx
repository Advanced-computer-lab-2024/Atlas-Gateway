import { ArrowLeft, ArrowRight, LocateIcon } from "lucide-react";
import { useState } from "react";

import { Flex } from "@/components/ui/flex";

interface SlideshowProps {
	placesPics: string[];
	type: string;
}

const Slideshow = ({ placesPics, type }: SlideshowProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? placesPics.length - 1 : prevIndex - 1,
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === placesPics.length - 1 ? 0 : prevIndex + 1,
		);
	};

	return (
		<Flex
			align="center"
			justify="center"
			className={`${
				type === "details" ? "w-[600px] h-[400px]" : "w-full h-full"
			} bg-gray-200 rounded-t-xl relative`}
		>
			{placesPics[currentIndex] ? (
				<img
					src={placesPics[currentIndex]}
					alt={`Slide ${currentIndex}`}
					className="w-full h-full object-cover rounded-t-xl"
				/>
			) : (
				<LocateIcon className="w-full h-40" />
			)}
			<button className="absolute left-2" onClick={handlePrevious}>
				<ArrowLeft />
			</button>
			<button className="absolute right-2" onClick={handleNext}>
				<ArrowRight />
			</button>
		</Flex>
	);
};

export default Slideshow;
