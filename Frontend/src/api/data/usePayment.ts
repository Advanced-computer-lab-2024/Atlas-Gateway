import { useMutation } from "@tanstack/react-query";

import { apiCreatePaymentIntent } from "../service/payment";

export function useCreatePaymentIntent(onSuccess: (data: any) => void) {
	const mutation = useMutation({
		mutationFn: ({
			amount,
			currency,
		}: {
			amount: number;
			currency: string;
		}) => apiCreatePaymentIntent(amount, currency),
		onSuccess,
	});

	const { mutate } = mutation;
	return { doCreatePaymentIntent: mutate, ...mutation };
}
