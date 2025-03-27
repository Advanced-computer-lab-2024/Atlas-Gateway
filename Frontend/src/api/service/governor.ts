import axios from "axios";

import { TAdmin } from "@/types/global";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";
import { TGovernorResponse } from "./types";

export function apiCreateGovernor(payload: TAdmin) {
	return axios({
		method: "POST",
		url: ENDPOINTS.governor.create,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
		data: payload,
	});
}

export function apiGovernors() {
	return axios<TGovernorResponse[]>({
		method: "GET",
		url: ENDPOINTS.governor.list,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiDeleteGovernor(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.governor.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}
