import axios from "axios";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";

export function apiCreatePaymentIntent(amount: number, currency: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.payment,
		headers: {
			"Content-Type": "application/json",
		},
		data: { amount, currency },
		baseURL: baseURL,
	});
}
