import { Stripe } from "stripe";

import { sendPaymentMail } from "../../Config/mail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createPaymentIntent = async (amount: number, currency: string) => {
	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency: currency,
		automatic_payment_methods: { enabled: true },
	});
	return paymentIntent;
};

export const confirmPayment = async (
	paymentIntentId: string,
	email: string,
	amount: number,
) => {
	const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
		return_url: "http://localhost:3000",
		payment_method: "pm_card_visa",
	});
	await sendPaymentMail(email, amount, "Card");
	return paymentIntent;
};
