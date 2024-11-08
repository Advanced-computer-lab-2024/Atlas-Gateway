import axios from "axios";

import { TActivity } from "@/types/global";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";
import { TApiResponse } from "./types";

export function apiActivities(
	id: string | undefined,
	filters: Record<string, string>,
	userType: string,
) {
	return axios<TApiResponse<TActivity[]>>({
		method: "GET",
		url: ENDPOINTS.activity.list,
		headers: {
			"Content-Type": "application/json",
			userid: id,
			usertype: userType,
		},
		params: {
			id,
			limit: 12,
			//date: `dateTime,${new Date().toISOString()},null`,
			...filters,
		},
		baseURL: baseURL,
	});
}

export function apiActivity(id: string | undefined) {
	return axios<TActivity>({
		method: "GET",
		url: ENDPOINTS.activity.show(id ?? ""),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiAdvertisorActivities(
	_id: string | undefined,
	filters: Record<string, string>,
	userType: string,
) {
	return axios<TApiResponse<TActivity[]>>({
		method: "GET",
		url: ENDPOINTS.activity.listAdvertisor,
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

export function apiCreateActivity(payload: TActivity, _id: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.activity.create,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: baseURL,
		data: payload,
	});
}

export function apiUpdateActivity(payload: TActivity) {
	return axios({
		method: "PUT",
		url: ENDPOINTS.activity.update(payload?._id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
		data: payload,
	});
}

export function apiDeleteActivity(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.activity.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiBookActivity(_id: string, userid: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.activity.book(_id),
		headers: {
			"Content-Type": "application/json",
			userid: userid,
		},
		baseURL: baseURL,
	});
}

export function apiCancelBooking(_id: string, userid: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.activity.cancelBooking(_id),
		headers: {
			"Content-Type": "application/json",
			userid: userid,
		},
		baseURL: baseURL,
	});
}
