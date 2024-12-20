import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCheckoutCart } from "@/api/data/useProducts";
import { useTouristProfile } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCurrency from "@/hooks/useCurrency";

import AddressDialogue from "./AddAddressPopup";
import OnlinePayment from "./OnlinePayment";

const Payment = () => {
	const { data, refetch } = useTouristProfile();
	const [selectedAddress, setSelectedAddress] = useState<string>("");
	const [promo, setPromo] = useState("");
	const convertCurrency = useCurrency();
	const formatCurrency = useCurrency();
	const stripePromise = loadStripe(
		import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!,
	);
	const navigate = useNavigate();

	const { doCheckoutCart } = useCheckoutCart(() => {
		navigate("/products");
	});
	const handleWalletPayment = async () => {
		doCheckoutCart({
			products:
				data?.cart?.map((product) => ({
					productId: product.product._id,
					product: product.product,
					quantity: product.quantity,
				})) || [],
			address: selectedAddress,
			paymentMethod: "Wallet",
			totalPrice: data?.cart.reduce(
				(acc, product) =>
					acc + product.product.price * product.quantity,
				0,
			),
			promoCode: promo,
			stripeAmount:
				parseFloat(
					convertCurrency(
						data?.cart.reduce(
							(acc, product) =>
								acc + product.product.price * product.quantity,
							0,
						),
					),
				) * 100,
		});
	};

	const handleCashPayment = async () => {
		doCheckoutCart({
			products:
				data?.cart?.map((product) => ({
					productId: product.product._id,
					product: product.product,
					quantity: product.quantity,
				})) || [],
			address: selectedAddress,
			paymentMethod: "Cash",
			totalPrice: data?.cart.reduce(
				(acc, product) =>
					acc + product.product.price * product.quantity,
				0,
			),
			promoCode: promo,
			stripeAmount:
				parseFloat(
					convertCurrency(
						data?.cart.reduce(
							(acc, product) =>
								acc + product.product.price * product.quantity,
							0,
						),
					),
				) * 100,
		});
	};

	useEffect(() => {
		setSelectedAddress(data?.address?.[0] || "Home");
	}, [data?.address]);

	return (
		<>
			<hr className="border-gray-600 border-solid border-1" />
			<Label.Thin400>Delivery Address</Label.Thin400>

			<Flex className="w-full" justify="between">
				<Select
					onValueChange={(value) =>
						setSelectedAddress(value as string)
					}
					value={selectedAddress}
				>
					<SelectTrigger>
						<SelectValue placeholder="Choose Address" />
					</SelectTrigger>
					<SelectContent>
						{data?.address?.map((address) => (
							<SelectItem value={address}>{address}</SelectItem>
						))}
					</SelectContent>
				</Select>
				<AddressDialogue userId={data?._id} refetchFunction={refetch} />
			</Flex>
			<Label.Thin300>Payment Method</Label.Thin300>
			<Tabs defaultValue="wallet" className="w-full">
				<TabsList className="grid w-full grid-cols-3 border-2 border-black">
					<TabsTrigger value="wallet">Wallet</TabsTrigger>
					<TabsTrigger value="credit_card">Credit Card</TabsTrigger>
					<TabsTrigger value="cash">Cash on delivery</TabsTrigger>
				</TabsList>
				<TabsContent value="wallet" className="mt-4">
					<Flex justify="between" align="center">
						<Flex>
							<Label.Thin300>
								Your Wallet Balance:{" "}
								<Label.Thin400>
									{formatCurrency(data?.walletBalance)}
								</Label.Thin400>
							</Label.Thin300>
						</Flex>
						<Flex>
							<Input
								type="text"
								placeholder="Enter Promo Code (if any)"
								value={promo}
								onChange={(e) => setPromo(e.target.value)}
							/>
						</Flex>
					</Flex>
					<Button
						onClick={() => handleWalletPayment()}
						className="w-full mt-4"
					>
						Checkout
					</Button>
				</TabsContent>
				<TabsContent value="credit_card" className="mt-4">
					<Elements
						stripe={stripePromise}
						options={{
							mode: "payment",
							amount:
								(data?.cart.reduce(
									(acc, product) =>
										acc +
										product.product.price *
											product.quantity,
									0,
								) || 0) * 100,
							currency:
								data?.currency.toLocaleLowerCase() || "egp",
							locale: "en",
							loader: "auto",
						}}
					>
						<OnlinePayment
							amount={
								(data?.cart.reduce(
									(acc, product) =>
										acc +
										product.product.price *
											product.quantity,
									0,
								) || 0) * 100
							}
							currency={data?.currency || ""}
							address={selectedAddress}
						/>
					</Elements>
				</TabsContent>
				<TabsContent value="cash" className="mt-4">
					<Flex className="m-4">
						<Input
							type="text"
							placeholder="Enter Promo Code (if any)"
							value={promo}
							onChange={(e) => setPromo(e.target.value)}
						/>
					</Flex>
					<Button
						onClick={() => handleCashPayment()}
						className="w-full"
					>
						Checkout
					</Button>
				</TabsContent>
			</Tabs>
		</>
	);
};

export default Payment;
