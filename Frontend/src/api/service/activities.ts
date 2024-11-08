import axios from "axios";

import { TActivity } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";
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
		baseURL: "http://localhost:5000",
	});
}

export function apiActivity(id: string | undefined) {
	return axios<TActivity>({
		method: "GET",
		url: ENDPOINTS.activity.show(id ?? ""),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
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
		baseURL: "http://localhost:5000",
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
		baseURL: "http://localhost:5000",
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
		baseURL: "http://localhost:5000",
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
		baseURL: "http://localhost:5000",
	});
}
