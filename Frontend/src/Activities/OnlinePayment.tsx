import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import { useActivity, useBookActivity } from "@/api/data/useActivities";
import { useCreatePaymentIntent } from "@/api/data/usePayment";
import { useTouristProfile } from "@/api/data/useProfile";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";

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
	const [promo, setPromo] = useState("");
	const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>({
		id: "",
		amount: 0,
		clientSecret: "",
	});
	const { data, refetch } = useActivity();
	const { refetch: refetchUserProfile } = useTouristProfile();
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
	const { doBookActivity } = useBookActivity(async () => {
		refetch();
		refetchUserProfile();
	});
	const handlePayment = async () => {
		if (!stripe || !elements) {
			return;
		}
		const { error } = await elements.submit();
		console.log(error);
		if (error === undefined) {
			doBookActivity({
				id: data?._id!,
				paymentType: "online",
				amount: paymentIntent.amount,
				promoCode: promo,
				paymentIntentId: paymentIntent.id,
			});
		}
	};
	return (
		<div className="flex flex-col">
			{paymentIntent.clientSecret && <PaymentElement />}
			<Flex className="m-4">
				<Input
					type="text"
					placeholder="Enter Promo Code"
					value={promo}
					onChange={(e) => setPromo(e.target.value)}
				/>
			</Flex>
			<Button onClick={() => handlePayment()}>Book Activity</Button>
		</div>
	);
};

export default OnlinePayment;
