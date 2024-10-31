import axios from "axios";

import { TAdmin, TGovernor } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";
import { TGovernorResponse } from "./types";

export function apiCreateGovernor(payload: TAdmin) {
	return axios({
		method: "POST",
		url: ENDPOINTS.governor.create,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
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
		baseURL: "http://localhost:5000",
	});
}

export function apiDeleteGovernor(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.governor.delete(_id),
		headers: {
			"content-type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}
