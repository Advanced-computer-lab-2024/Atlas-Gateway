import { DollarSign, EllipsisVertical, LocateIcon, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Label from "@/components/ui/Label";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flex } from "@/components/ui/flex";
import { TProduct } from "@/types/global";

export default function ProductCard({
	_id,
	name,
	description,
	images,
	price,
	rating,
	seller,
}: TProduct) {
	const navigate = useNavigate();
	return (
		<Card
			key={_id}
			className="w-full h-[370px] flex gap-2 flex-col border-surface-secondary border-2"
		>
			<Flex
				align="center"
				justify="center"
				className="w-full h-40 bg-gray-200 rounded-xl"
			>
				{images?.[0] ? (
					<img src={images[0]} />
				) : (
					<LocateIcon className="w-full h-40" />
				)}
			</Flex>
			<hr />
			<CardContent className="p-2">
				<Flex isColumn gap="2" className="px-3">
					<Flex gap="2" align="center" justify="between">
						<Label.Mid500>{name}</Label.Mid500>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<EllipsisVertical className="cursor-pointer" />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem
									onClick={() => {
										navigate(`/products/${_id}`);
									}}
								>
									View Product Details
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</Flex>
					<Label.Mid300>{description}</Label.Mid300>
					<Flex gap="1" align="center">
						<Label.Mid300 className="overflow-ellipsis">
							Seller
						</Label.Mid300>
						<Label.Thin300 className="overflow-ellipsis">
							{seller?.username}
						</Label.Thin300>
					</Flex>
					<Flex align="center" justify="between">
						<Flex gap="2" align="center" justify="between">
							<DollarSign size={20} />
							<Label.Thin200 className="overflow-ellipsis">
								{price}
							</Label.Thin200>
						</Flex>
						<Flex gap="1" align="center">
							<Star color="yellow" fill="yellow" size={20} />
							<Label.Thin300 className="overflow-ellipsis">
								{rating}
							</Label.Thin300>
						</Flex>
					</Flex>
				</Flex>
			</CardContent>
		</Card>
	);
}
