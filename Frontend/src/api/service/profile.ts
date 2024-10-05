import axios from "axios";

import ENDPOINTS from "./ENDPOINTS";
import { TTouristProfileResponse, TAdvertisorProfileResponse } from "./types";

export function apiTouristProfile( id : string) {
	return axios<TTouristProfileResponse>({
		method: "GET",
		url: ENDPOINTS.tourist.show(id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiAdvertisorProfile( id : string) {
	return axios<TAdvertisorProfileResponse>({
		method: "GET",
		url: ENDPOINTS.tourist.show(id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}