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

export default function CartProduct({
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
			<Flex className="w-full" isColumn justify="between">
				<Flex className="w-full" isColumn gap="3">
					<Flex className="w-full" justify="between">
						<Label.Mid400>{product.name}</Label.Mid400>
						<Label.Mid400>
							{convertCurrency(product.price)}
						</Label.Mid400>
					</Flex>
					<Label.Mid300>{product.description}</Label.Mid300>
					<Label.Mid300>Stock: {product.quantity}</Label.Mid300>
				</Flex>
				<Flex gap="3">
					<Flex
						className="rounded-full border-surface-primary border-2 px-2 py-1 w-fit"
						gap="3"
						align="center"
					>
						{quantity === 1 ? (
							<Trash2
								onClick={() =>
									doRemoveProductFromCart(product._id)
								}
								className="cursor-pointer"
							/>
						) : (
							<Minus
								onClick={() =>
									doUpdateProductQuantity({
										productId: product._id,
										quantity: product.quantity - 1,
									})
								}
								className="cursor-pointer"
							/>
						)}
						<Label.Mid400>{quantity}</Label.Mid400>
						<Plus
							onClick={() =>
								doUpdateProductQuantity({
									productId: product._id,
									quantity: product.quantity + 1,
								})
							}
							className="cursor-pointer"
						/>
					</Flex>
					<Button
						variant="destructive"
						className="rounded-lg"
						onClick={() => doRemoveProductFromCart(product._id)}
					>
						Remove
					</Button>
					<Button
						variant="outline"
						className="rounded-lg"
						onClick={() => doRemoveProductFromCart(product._id)}
					>
						Add to wishslist
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
}
