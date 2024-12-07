import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import { useBookItinerary, useItinerary } from "@/api/data/useItineraries";
import { useCreatePaymentIntent } from "@/api/data/usePayment";
import { useTouristProfile } from "@/api/data/useProfile";
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
	const { data, refetch } = useItinerary();
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
	const { doBookItinerary } = useBookItinerary(async () => {
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
			doBookItinerary({
				id: data?._id!,
				paymentType: "online",
				amount: paymentIntent.amount,
				paymentIntentId: paymentIntent.id,
			});
		}
	};
	return (
		<div className="flex flex-col">
			{paymentIntent.clientSecret && <PaymentElement />}
			<Button onClick={() => handlePayment()}>Book Itinerary</Button>
		</div>
	);
};

export default OnlinePayment;
