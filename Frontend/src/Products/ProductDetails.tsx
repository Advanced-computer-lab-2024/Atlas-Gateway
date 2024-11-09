import axios from "axios";
import { ArrowLeft, Package, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProduct } from "@/api/data/useProducts";
import Label from "@/components/ui/Label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
			justify="center"
			align="center"
			className="p-4 overflow-y-scroll w-full h-full"
		>
			<Card className="w-[80%] border-black border-2">
				<CardHeader>
					<Flex gap="2" align="center">
						<ArrowLeft
							className="cursor-pointer"
							onClick={() => navigate("/products")}
							size={32}
						/>
						<Label.Big600>{name}</Label.Big600>
					</Flex>
				</CardHeader>
				<CardContent>
					<Flex gap="8">
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
						<Flex gap="3" isColumn align="start">
							<Label.Big500>Product info</Label.Big500>
							<Flex gap="2" isColumn>
								<Label.Thin300>
									Quantity Available
								</Label.Thin300>
								<Label.Mid500 className="overflow-ellipsis">
									{quantity}
								</Label.Mid500>
							</Flex>
							<Flex gap="2" isColumn>
								<Label.Thin300>Price:</Label.Thin300>
								<Label.Mid500 className="overflow-ellipsis">
									{convertCurrency(price)}
								</Label.Mid500>
							</Flex>
							<Flex gap="2" isColumn>
								<Label.Thin300>Rating:</Label.Thin300>
								<Flex gap="2" align="center">
									<Label.Mid500 className="overflow-ellipsis">
										{avgRating ?? 0}
									</Label.Mid500>
									<Star
										color="yellow"
										fill="yellow"
										size={24}
									/>
								</Flex>
							</Flex>
							{canViewSales && (
								<Flex gap="2" isColumn>
									<Label.Thin300>Sales:</Label.Thin300>
									<Label.Mid500 className="overflow-ellipsis">
										{sales}
									</Label.Mid500>
								</Flex>
							)}
							<Flex isColumn gap="2" align="start">
								<Label.Thin300 className="w-40 text-left">
									Description:
								</Label.Thin300>
								<Label.Mid500>{description}</Label.Mid500>
							</Flex>
						</Flex>
					</Flex>
				</CardContent>
			</Card>
		</Flex>
	);
}
