import axios from "axios";
import { ArrowLeft, DollarSign, Package, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProduct } from "@/api/data/useProducts";
import Label from "@/components/ui/Label";
import { Card } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import useCurrency from "@/hooks/useCurrency";
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";

export default function ProductDetails() {
	const navigate = useNavigate();
	const { data } = useProduct();
	const convertCurrency = useCurrency();
	const {
		name,
		description,
		price,
		imagePath,
		avgRating,
		quantity,
		sales,
		sellerId,
	} = data || {};

	const { user } = useLoginStore();
	const [productPic, setProductPic] = useState("");

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
		handleDownload(imagePath || "");
	}, [imagePath]);

	const canViewSales =
		user?.type === sellerId || user?.type === EAccountType.Admin;

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
						<Flex isColumn justify="around">
							<Flex gap="2" align="center" justify="between">
								<Label.Big600 className="w-40 text-left">
									Description:{" "}
								</Label.Big600>
								<Label.Mid500>{description}</Label.Mid500>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-40 text-left">
									Quantity Available:{" "}
								</Label.Big600>
								<Label.Mid500>{quantity}</Label.Mid500>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-40 text-left">
									Price:{" "}
								</Label.Big600>
								<DollarSign size={32} />
								<Label.Mid500 className="overflow-ellipsis">
									{convertCurrency(price)}
								</Label.Mid500>
							</Flex>
							<Flex gap="2" align="center">
								<Label.Big600 className="w-40 text-left">
									Rating:{" "}
								</Label.Big600>
								<Star color="yellow" fill="yellow" size={32} />
								<Label.Mid500 className="overflow-ellipsis">
									{avgRating}
								</Label.Mid500>
							</Flex>
							{canViewSales && (
								<Flex gap="2" align="center">
									<Label.Big600 className="w-40 text-left">
										Sales Made:{" "}
									</Label.Big600>
									<DollarSign size={32} />
									<Label.Mid500 className="overflow-ellipsis">
										{sales}
									</Label.Mid500>
								</Flex>
							)}
						</Flex>
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
}
