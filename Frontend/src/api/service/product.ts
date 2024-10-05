import axios from "axios";

import { TProduct } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";

export function apiProducts(
	id: string | undefined,
	filters: Record<string, string>,
) {
	return axios<TProduct[]>({
		method: "GET",
		url: ENDPOINTS.products.list,
		headers: {
			"Content-Type": "application/json",
			userid: id,
		},
		params: {
			id,
			...filters,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiProduct(id: string | undefined) {
	return axios<TProduct>({
		method: "GET",
		url: ENDPOINTS.products.show(id ?? ""),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}
