import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import { useCreatePaymentIntent } from "@/api/data/usePayment";
import { Button } from "@/components/ui/button";

interface props {
	amount: number;
	currency: string;
}

interface PaymentIntent {
	id: string;
	amount: number;
	clientSecret: string;
}
const OnlinePayment = ({ amount, currency }: props) => {
	const stripe = useStripe();
	const elements = useElements();
	const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>({
		id: "",
		amount: 0,
		clientSecret: "",
	});
	useEffect(() => {
		amount = amount * 100;
		doCreatePaymentIntent({ amount, currency });
	}, [amount]);
	const { doCreatePaymentIntent } = useCreatePaymentIntent((response) => {
		setPaymentIntent({
			id: response.data.id,
			amount: response.data.amount,
			clientSecret: response.data.client_secret,
		});
	});
	const handleOnlinePayment = async () => {
		if (!stripe || !elements) {
			return;
		}
		const { error } = await elements.submit();
		console.log(error);
		if (error === undefined) {
		}
	};
	return (
		<div className="flex flex-col">
			{paymentIntent.clientSecret && <PaymentElement />}
			<Button className="mt-4" onClick={() => handleOnlinePayment()}>
				Checkout
			</Button>
		</div>
	);
};

export default OnlinePayment;
