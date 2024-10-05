import axios from "axios";

import { TActivity } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";

export function apiActivities(
	id: string | undefined,
	filters: Record<string, string>,
) {
	return axios<TActivity[]>({
		method: "GET",
		url: ENDPOINTS.activities.list,
		headers: {
			"Content-Type": "application/json",
			userid: id,
		},
		params: {
			id,
			...filters,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiActivity(id: string | undefined) {
	return axios<TActivity>({
		method: "GET",
		url: ENDPOINTS.activities.show(id ?? ""),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}
