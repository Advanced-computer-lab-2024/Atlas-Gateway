import axios from "axios";

import { TItinerary } from "@/types/global";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";
import { TApiResponse } from "./types";

export function apiItineraries(
	_id: string | undefined,
	filters: Record<string, string>,
	userType: string,
) {
	return axios<TApiResponse<TItinerary[]>>({
		method: "GET",
		url: ENDPOINTS.itinerary.list,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
			usertype: userType,
		},
		params: {
			...filters,
		},
		baseURL: baseURL,
	});
}

export function apiTourGuideItineraries(
	_id: string | undefined,
	filters: Record<string, string>,
	userType: string,
) {
	return axios<TApiResponse<TItinerary[]>>({
		method: "GET",
		url: ENDPOINTS.itinerary.listTourguide,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
			usertype: userType,
		},
		params: {
			...filters,
		},
		baseURL: baseURL,
	});
}

export function apiItinerary(_id: string | undefined) {
	return axios<TItinerary>({
		method: "GET",
		url: ENDPOINTS.itinerary.show(_id ?? ""),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
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
		baseURL: baseURL,
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
		baseURL: baseURL,
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
		baseURL: baseURL,
	});
}

export function apiBookItinerary(_id: string, _userId: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.itinerary.book(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _userId,
		},
		baseURL: baseURL,
	});
}

export function apiCancelBooking(_id: string, _userId: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.itinerary.cancelBooking(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _userId,
		},
		baseURL: baseURL,
	});
}
