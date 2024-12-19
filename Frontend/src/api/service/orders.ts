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

export async function apiOrder(
	orderId: string | undefined,
	userid: string | undefined,
) {
	return await axios<TOrder>({
		method: "GET",
		url: ENDPOINTS.orders.show(orderId ?? ""),
		headers: {
			"Content-Type": "application/json",
			userid: userid,
		},
		baseURL: baseURL,
	});
}
