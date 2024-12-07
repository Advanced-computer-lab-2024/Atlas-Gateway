import axios from "axios";

import { TTransportation } from "@/types/global";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";
import { TApiResponse } from "./types";

export function apiTransportations(id: string | undefined, userType: string) {
	return axios<TApiResponse<TTransportation[]>>({
		method: "GET",
		url: ENDPOINTS.transportation.list,
		headers: {
			"Content-Type": "application/json",
			userid: id,
			usertype: userType,
		},
		baseURL: baseURL,
	});
}

export function apiTransportation(id: string | undefined) {
	return axios<TTransportation>({
		method: "GET",
		url: ENDPOINTS.transportation.get(id ?? ""),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiAdvertisorTransportations(
	_id: string | undefined,
	userType: string,
) {
	return axios<TApiResponse<TTransportation[]>>({
		method: "GET",
		url: ENDPOINTS.transportation.listAdvertisor,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
			usertype: userType,
		},
		baseURL: baseURL,
	});
}

export function apiCreateTransportation(payload: TTransportation, _id: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.transportation.create,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: baseURL,
		data: payload,
	});
}

export function apiUpdateTransportation(payload: TTransportation) {
	return axios({
		method: "PUT",
		url: ENDPOINTS.transportation.update(payload?._id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
		data: payload,
	});
}

export function apiDeleteTransportation(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.transportation.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiBookTransportation(_id: string, userid: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.transportation.book(_id),
		headers: {
			"Content-Type": "application/json",
			userid: userid,
		},
		baseURL: baseURL,
	});
}

export function apiCancelTransportationBooking(_id: string, userid: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.transportation.cancelBooking(_id),
		headers: {
			"Content-Type": "application/json",
			userid: userid,
		},
		baseURL: baseURL,
	});
}
