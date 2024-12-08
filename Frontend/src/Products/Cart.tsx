import { useNavigate } from "react-router-dom";

import { useTouristProfile } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import useCurrency from "@/hooks/useCurrency";

import CartProduct from "./CartProduct";
import Payment from "./Payment";

export default function Cart() {
	const { data: tourist } = useTouristProfile();
	const formatCurrency = useCurrency();
	const navigate = useNavigate();

	return (
		<Flex className="w-full h-full">
			{tourist?.cart && tourist?.cart?.length > 0 ? (
				<>
					<Flex
						className="w-2/3 p-4 overflow-y-scroll"
						isColumn
						gap="4"
					>
						{tourist?.cart.map((product) => (
							<CartProduct {...product} />
						))}
					</Flex>
					<Flex className="w-1/3 p-4 h-fit">
						{tourist?.cart && tourist?.cart?.length > 0 && (
							<Flex
								className="w-full p-4 bg-white rounded-lg"
								isColumn
								gap="4"
							>
								<Flex className="w-full" justify="between">
									<Label.Mid600>
										Subtotal ({tourist?.cart.length} item
										{tourist.cart.length > 1 ? "s" : ""})
									</Label.Mid600>
									<Label.Mid600>
										{formatCurrency(
											tourist?.cart.reduce(
												(acc, { product, quantity }) =>
													acc +
													product.price * quantity,
												0,
											),
										)}
									</Label.Mid600>
								</Flex>
								{tourist?.cart.map(({ product, quantity }) => (
									<Flex
										key={product._id}
										className="w-full"
										justify="between"
										gap="3"
										isColumn={true}
									>
										<Flex justify="between">
											{" "}
											<Label.Mid400>
												{product.name}
											</Label.Mid400>
											<Label.Mid400>
												{quantity} x{" "}
												{formatCurrency(product.price)}{" "}
												={" "}
												{formatCurrency(
													product.price * quantity,
												)}
											</Label.Mid400>
										</Flex>
									</Flex>
								))}
								<Flex isColumn={true} gap="3">
									<Payment
										amount={formatCurrency(
											tourist?.cart.reduce(
												(acc, { product, quantity }) =>
													acc +
													product.price * quantity,
												0,
											),
										)}
									/>
								</Flex>
							</Flex>
						)}
					</Flex>
				</>
			) : (
				<Flex className="w-full justify-center items-center " isColumn>
					<Label.Mid400>Your cart is empty</Label.Mid400>
					<Button
						variant="default"
						className="mt-4"
						onClick={() => navigate("/products")}
					>
						Continue Shopping
					</Button>
				</Flex>
			)}
		</Flex>
	);
}
