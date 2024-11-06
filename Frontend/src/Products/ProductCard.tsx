import axios from "axios";
import { DollarSign, EllipsisVertical, Package, Star } from "lucide-react";
import { useEffect, useState } from "react";
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
import { useLoginStore } from "@/store/loginStore";
import { TProduct } from "@/types/global";

import ProdcutForm from "./ProductForm";

export default function ProductCard({
	_id,
	name,
	description,
	imagePath,
	price,
	avgRating,
	sellerId,
}: TProduct) {
	const { user } = useLoginStore();
	const navigate = useNavigate();
	const [productPic, setProductPic] = useState("");
	const handleDownload = async (filePath: string) => {
		axios
			.post(`http://localhost:5000/api/media/download`, { filePath })
			.then((res) => {
				setProductPic(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		handleDownload(imagePath);
	}, [imagePath]);
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
				{!productPic ? (
					<Package className="w-20 h-20" />
				) : (
					<img
						src={productPic}
						alt="Product Picture"
						className="object-cover w-full h-full"
					/>
				)}
			</Flex>
			<hr />
			<CardContent className="p-2">
				<Flex isColumn gap="2" className="px-3">
					<Flex gap="2" align="center" justify="between">
						<Label.Mid500>{name}</Label.Mid500>
						<div className="flex items-center">
							{user?._id == sellerId ? (
								<ProdcutForm type="Update" id={_id} />
							) : (
								<></>
							)}
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
						</div>
					</Flex>
					<Label.Mid300>{description}</Label.Mid300>
					<Flex gap="1" align="center">
						<Label.Mid300 className="overflow-ellipsis">
							Seller
						</Label.Mid300>
						{/* <Label.Thin300 className="overflow-ellipsis">
							{seller?.username}
						</Label.Thin300> */}
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
								{avgRating}
							</Label.Thin300>
						</Flex>
					</Flex>
				</Flex>
			</CardContent>
		</Card>
	);
}
