import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCheckoutCart } from "@/api/data/useProducts";
import { useTouristProfile } from "@/api/data/useProfile";
import Label from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCurrency from "@/hooks/useCurrency";

import OnlinePayment from "./OnlinePayment";

interface props {
	amount: string;
}

const Payment = ({ amount }: props) => {
	const { data } = useTouristProfile();
	const [selectedAddress, setSelectedAddress] = useState<string>("");
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
		});
	};

	useEffect(() => {
		setSelectedAddress(data?.address?.[0] || "Home");
	}, [data?.address]);

	return (
		<>
			<Select
				onValueChange={(value) => setSelectedAddress(value as string)}
				value={selectedAddress}
			>
				<SelectTrigger>Choose Address</SelectTrigger>
				<SelectContent>
					{data?.address?.map((address) => (
						<SelectItem value={address}>{address}</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Tabs defaultValue="wallet" className="w-full">
				<TabsList className="grid w-full grid-cols-3 border-2 border-black">
					<TabsTrigger value="wallet">Wallet</TabsTrigger>
					<TabsTrigger value="credit_card">Credit Card</TabsTrigger>
					<TabsTrigger value="cash">Cash on delivery</TabsTrigger>
				</TabsList>
				<TabsContent value="wallet" className="mt-4">
					<Flex>
						<Label.Thin300>
							Your Wallet Balance:{" "}
							<Label.Thin400>
								{formatCurrency(data?.walletBalance)}
							</Label.Thin400>
						</Label.Thin300>
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
							amount: parseFloat(amount) * 100,
							currency:
								data?.currency.toLocaleLowerCase() || "egp",
							locale: "en",
							loader: "auto",
						}}
					>
						<OnlinePayment
							amount={parseFloat(amount) * 100}
							currency={data?.currency || ""}
							address={selectedAddress}
						/>
					</Elements>
				</TabsContent>
				<TabsContent value="cash" className="mt-4">
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
