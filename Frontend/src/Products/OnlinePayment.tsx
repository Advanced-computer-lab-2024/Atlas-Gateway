import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreatePaymentIntent } from "@/api/data/usePayment";
import { useCheckoutCart } from "@/api/data/useProducts";
import { useTouristProfile } from "@/api/data/useProfile";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";
import useCurrency from "@/hooks/useCurrency";

interface props {
	amount: number;
	currency: string;
	address: string;
}

interface PaymentIntent {
	id: string;
	amount: number;
	clientSecret: string;
}
const OnlinePayment = ({ amount, currency, address }: props) => {
	const stripe = useStripe();
	const convertCurrency = useCurrency();
	const elements = useElements();
	const { data } = useTouristProfile();
	const [promo, setPromo] = useState("");
	const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>({
		id: "",
		amount: 0,
		clientSecret: "",
	});
	useEffect(() => {
		doCreatePaymentIntent({ amount, currency });
	}, [amount]);
	const { doCreatePaymentIntent } = useCreatePaymentIntent((response) => {
		setPaymentIntent({
			id: response.data.id,
			amount: response.data.amount,
			clientSecret: response.data.client_secret,
		});
	});
	const navigate = useNavigate();

	const { doCheckoutCart } = useCheckoutCart(() => {
		navigate("/products");
	});
	const handleOnlinePayment = async () => {
		if (!stripe || !elements) {
			return;
		}
		const { error } = await elements.submit();
		console.log(error);
		if (error === undefined) {
			doCheckoutCart({
				products:
					data?.cart?.map((product) => ({
						productId: product.product._id,
						product: product.product,
						quantity: product.quantity,
					})) || [],
				address: address,
				paymentMethod: "Card",
				totalPrice: data?.cart.reduce(
					(acc, product) =>
						acc + product.product.price * product.quantity,
					0,
				),
				promoCode: promo,
				paymentIntentId: paymentIntent.id,
				stripeAmount: parseFloat(convertCurrency(amount)),
			});
		}
	};
	return (
		<div className="flex flex-col">
			{paymentIntent.clientSecret && <PaymentElement />}
			<Flex className="m-4">
				<Input
					type="text"
					placeholder="Enter Promo Code (if any)"
					value={promo}
					onChange={(e) => setPromo(e.target.value)}
				/>
			</Flex>
			<Button className="mt-4" onClick={() => handleOnlinePayment()}>
				Checkout
			</Button>
		</div>
	);
};

export default OnlinePayment;
