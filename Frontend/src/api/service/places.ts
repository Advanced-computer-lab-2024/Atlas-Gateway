import axios from "axios";

import { TPlace } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";

export function apiPlaces(
	id: string | undefined,
	filters: Record<string, string>,
) {
	return axios<TPlace[]>({
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

export function apiPlace(id: string | undefined) {
	return axios<TPlace>({
		method: "GET",
		url: ENDPOINTS.products.show(id ?? ""),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}
