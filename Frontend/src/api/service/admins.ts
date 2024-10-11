import axios from "axios";

import { TAdmin } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";
import { TApiResponse } from "./types";

export function apiCreateAdmin() {
	return axios<TApiResponse<TAdmin[]>>({
		method: "GET",
		url: ENDPOINTS.admin.list,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiDeleteAdmin(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.admin.delete(_id),
		headers: {
			"content-type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}
