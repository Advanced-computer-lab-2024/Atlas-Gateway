import axios from "axios";

import { TPlace } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";
import { TApiResponse } from "./types";

export function apiPlaces(
	_id: string | undefined,
	filters: Record<string, string>,
) {
	return axios<TApiResponse<TPlace[]>>({
		method: "GET",
		url: ENDPOINTS.places.list,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		params: {
			_id,
			limit: 12,
			...filters,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiPlace(_id: string | undefined) {
	return axios<TPlace>({
		method: "GET",
		url: ENDPOINTS.places.show(_id ?? ""),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}
