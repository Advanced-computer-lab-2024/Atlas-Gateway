import axios from "axios";
import {
	DollarSign,
	Edit,
	EllipsisVertical,
	Eye,
	Package,
	Star,
} from "lucide-react";
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
import useCurrency from "@/hooks/useCurrency";
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";
import { TProduct } from "@/types/global";

export default function ProductCard({
	product,
	openEditDrawer,
}: {
	product: TProduct;
	openEditDrawer: (product: TProduct) => void;
}) {
	const { user } = useLoginStore();
	const navigate = useNavigate();
	const [productPic, setProductPic] = useState("");

	const {
		_id,
		name,
		description,
		imagePath,
		price,
		avgRating,
		sellerId,
		sales,
	} = product;

	const convertCurrency = useCurrency();

	const handleDownload = async (filePath: string) => {
		try {
			axios
				.post(`http://localhost:5000/api/media/download`, { filePath })
				.then((res) => {
					setProductPic(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		handleDownload(imagePath);
	}, [imagePath]);

	const canViewSales =
		user?.type === sellerId || user?.type === EAccountType.Admin;

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
						className="object-contain w-full h-full"
					/>
				)}
			</Flex>
			<hr />
			<CardContent className="p-2">
				<Flex isColumn gap="2" className="px-3">
					<Flex gap="2" align="center" justify="between">
						<Label.Mid500>{name}</Label.Mid500>
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger>
								<EllipsisVertical className="cursor-pointer" />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem
									className="flex gap-2 cursor-pointer"
									onClick={() => {
										navigate(`/products/${_id}`);
									}}
								>
									<Eye />
									View Details
								</DropdownMenuItem>{" "}
								<DropdownMenuItem
									className="flex gap-2 cursor-pointer"
									onClick={() => {
										openEditDrawer(product);
									}}
								>
									<Edit />
									Edit
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
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
								{convertCurrency(price)}
							</Label.Thin200>
						</Flex>
						<Flex gap="1" align="center">
							<Star color="yellow" fill="yellow" size={20} />
							<Label.Thin300 className="overflow-ellipsis">
								{avgRating}
							</Label.Thin300>
						</Flex>
					</Flex>
					{canViewSales && (
						<Flex gap="1" align="center">
							<Label.Mid300 className="overflow-ellipsis">
								Sales
							</Label.Mid300>
							<Label.Thin200 className="overflow-ellipsis">
								{sales}
							</Label.Thin200>
						</Flex>
					)}
				</Flex>
			</CardContent>
		</Card>
	);
}
