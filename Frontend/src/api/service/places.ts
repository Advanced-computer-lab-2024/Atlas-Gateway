import axios from "axios";

import { TPlace } from "@/types/global";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";
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
		baseURL: baseURL,
	});
}

export function apiPlace(_id: string | undefined) {
	return axios<TPlace>({
		method: "GET",
		url: ENDPOINTS.places.show(_id ?? ""),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiCreatePlace(payload: TPlace, _id: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.places.create,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: baseURL,
		data: payload,
	});
}
export function apiGovernerPlaces(
	_id: string | undefined,
	filters: Record<string, string>,
) {
	return axios<TApiResponse<TPlace[]>>({
		method: "GET",
		url: ENDPOINTS.places.listGoverner,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		params: {
			...filters,
		},
		baseURL: baseURL,
	});
}

export function apiUpdatePlace(payload: TPlace) {
	return axios({
		method: "PUT",
		url: ENDPOINTS.places.update(payload?._id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
		data: payload,
	});
}

export function apiDeletePlace(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.places.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}
