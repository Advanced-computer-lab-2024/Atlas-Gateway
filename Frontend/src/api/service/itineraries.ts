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
			...filters,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiTourGuideItineraries(
	_id: string | undefined,
	filters: Record<string, string>,
) {
	return axios<TApiResponse<TItinerary[]>>({
		method: "GET",
		url: ENDPOINTS.itinerary.listTourguide,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		params: {
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

export function apiCreateItinerary(payload: TItinerary, _id: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.itinerary.create,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: "http://localhost:5000",
		data: payload,
	});
}

export function apiUpdateItinerary(payload: TItinerary) {
	return axios({
		method: "PUT",
		url: ENDPOINTS.itinerary.update(payload?._id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
		data: payload,
	});
}

export function apiDeleteItinerary(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.itinerary.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}
