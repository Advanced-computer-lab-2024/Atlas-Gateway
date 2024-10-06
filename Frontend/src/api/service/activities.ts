import axios from "axios";

import { TActivity } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";
import { TApiResponse } from "./types";

export function apiActivities(
	id: string | undefined,
	filters: Record<string, string>,
) {
	return axios<TApiResponse<TActivity[]>>({
		method: "GET",
		url: ENDPOINTS.activity.list,
		headers: {
			"Content-Type": "application/json",
			userid: id,
		},
		params: {
			id,
			limit: 12,
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
