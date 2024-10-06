import axios from "axios";



import { TProduct } from "@/types/global";



import ENDPOINTS from "./ENDPOINTS";
import { TApiResponse } from "./types";


export function apiProducts(_id: string | undefined, filters: Record<string, string>) {
	return axios<TApiResponse<TProduct[]>>({
		method: "GET",
		url: ENDPOINTS.products.list,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		params: {
			_id,
			...filters,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiProduct(_id: string | undefined) {
	return axios<TProduct>({
		method: "GET",
		url: ENDPOINTS.products.show(_id ?? ""),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}