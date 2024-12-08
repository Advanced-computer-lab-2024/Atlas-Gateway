import axios from "axios";

import { TOrder } from "@/types/global";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";
import { TApiResponse } from "./types";

export function apiOrders(_id: string | undefined) {
	return axios<TApiResponse<TOrder>>({
		method: "GET",
		url: ENDPOINTS.orders.list,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: baseURL,
	});
}

export async function apiOrder(_id: string | undefined) {
	return await axios<TOrder>({
		method: "GET",
		url: ENDPOINTS.orders.show(_id ?? ""),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}
