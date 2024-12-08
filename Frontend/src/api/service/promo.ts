import axios from "axios";

import { TPromo } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";
import { TApiResponse } from "./types";

export function apiCreatePromo(data: Partial<TPromo>) {
	return axios({
		method: "POST",
		url: ENDPOINTS.promo.create,
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
		baseURL: "http://localhost:5000",
	});
}

export function apiPromoCodes() {
	return axios<TApiResponse<TPromo[]>>({
		method: "GET",
		url: ENDPOINTS.promo.list,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}
