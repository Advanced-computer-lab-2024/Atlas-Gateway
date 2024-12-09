import axios from "axios";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import {
	useRemoveProductFromCart,
	useUpdateProductQuantity,
} from "@/api/data/useProducts";
import { useTouristProfile } from "@/api/data/useProfile";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import useCurrency from "@/hooks/useCurrency";
import { TProduct } from "@/types/global";

import Label from "../components/ui/Label";

export default function orderItem({
	product,
	quantity,
}: {
	product: TProduct;
	quantity: number;
}) {
	const { refetch } = useTouristProfile();
	const convertCurrency = useCurrency();
	const { doRemoveProductFromCart } = useRemoveProductFromCart(refetch);
	const { doUpdateProductQuantity } = useUpdateProductQuantity(refetch);

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
		handleDownload(product.imagePath);
	}, [product.imagePath]);

	return (
		<Flex
			key={product._id}
			className="w-full p-4 bg-white rounded-lg"
			gap="4"
		>
			<img
				src={productPic}
				alt="Product Picture"
				className="object-contain w-48 h-48 border-black border rounded-md"
			/>
			<div
				className="w-full"
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "start",
				}}
			>
				<Flex className="w-full mt-5" justify="between">
					<Label.Mid400>{product.name}</Label.Mid400>
					<Label.Mid400>
						{quantity} x {convertCurrency(product.price)} ={" "}
						{convertCurrency(product.price * quantity)}
					</Label.Mid400>
				</Flex>
				<Label.Mid300 className="mt-5">
					{product.description}
				</Label.Mid300>
			</div>
		</Flex>
	);
}
