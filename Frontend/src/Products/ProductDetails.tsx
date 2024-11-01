import { ArrowLeft, DollarSign, LocateIcon, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useProduct } from "@/api/data/useProducts";
import Label from "@/components/ui/Label";
import { Card } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import Rating from "@/components/ui/rating";

export default function ProductDetails() {
	const navigate = useNavigate();
	const { data } = useProduct();
	const { name, description, images, price, avgRating, availability } =
		data || {};

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
								<Rating value={avgRating} />
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
}
