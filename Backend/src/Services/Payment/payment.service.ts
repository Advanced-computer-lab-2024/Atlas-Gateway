import { Stripe } from "stripe";

import transporter from "../../Config/mail";
import * as mailTemplate from "../../Config/mailTemplate";

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
	await transporter.sendMail({
		from: `${process.env.SYSTEM_EMAIL}`,
		to: `${email}`,
		subject: "Payment Receipt",
		html: mailTemplate.receiptTemplate(amount),
	});
	return paymentIntent;
};
