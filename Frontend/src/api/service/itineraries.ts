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

export function apiBookItinerary(
	_id: string,
	paymentType: string,
	amount: number,
	_userId: string,
	promoCode: string,
	stripeAmount: number,
	paymentIntentId?: string,
) {
	return axios({
		method: "POST",
		url: ENDPOINTS.itinerary.book(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _userId,
		},
		data: {
			paymentIntentId,
			paymentType,
			amount,
			promoCode,
			stripeAmount,
		},
		baseURL: baseURL,
	});
}

export function apiBookmarkItinerary(_id: string, _userId: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.itinerary.bookmark(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _userId,
		},
		baseURL: baseURL,
	});
}

export function apiCancelItineraryBooking(_id: string, _userId: string) {
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

export function apiRemoveBookmarkItinerary(_id: string, _userId: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.itinerary.removeBookmark(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _userId,
		},
		baseURL: baseURL,
	});
}

export function apiFlagItinerary(_id: string) {
	return axios({
		method: "PUT",
		url: ENDPOINTS.itinerary.flag(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiToggleItineraryStatus(_id: string) {
	return axios({
		method: "PUT",
		url: ENDPOINTS.itinerary.toggleStatus(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiUpcomingItineraries(touristId: string) {
	return axios<TApiResponse<TItinerary[]>>({
		method: "GET",
		url: ENDPOINTS.tourist.upcomingItineraries(touristId),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiPastItineraries(touristId: string) {
	return axios<TApiResponse<TItinerary[]>>({
		method: "GET",
		url: ENDPOINTS.tourist.pastItineraries(touristId),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiItineraryNotification(
	touristId: string,
	itineraryId: string,
) {
	return axios({
		method: "POST",
		url: ENDPOINTS.tourist.itineraryNotification,
		headers: {
			"Content-Type": "application/json",
		},
		data: {
			touristId,
			itineraryId,
		},
		baseURL: baseURL,
	});
}

export function apiRemoveItineraryNotification(
	touristId: string,
	itineraryId: string,
) {
	return axios({
		method: "POST",
		url: ENDPOINTS.tourist.removeItineraryNotification,
		headers: {
			"Content-Type": "application/json",
		},
		data: {
			touristId,
			itineraryId,
		},
		baseURL: baseURL,
	});
}
