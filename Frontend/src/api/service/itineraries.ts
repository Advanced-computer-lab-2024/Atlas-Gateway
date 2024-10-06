import axios from "axios";

import { TItinerary } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";
import { TApiResponse } from "./types";

export function apiItineraries(
	_id: string | undefined,
	filters: Record<string, string>,
) {
	return axios<TApiResponse<TItinerary[]>>({
		method: "GET",
		url: ENDPOINTS.itinerary.list,
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

export function apiItinerary(_id: string | undefined) {
	return axios<TItinerary>({
		method: "GET",
		url: ENDPOINTS.itinerary.show(_id ?? ""),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}
