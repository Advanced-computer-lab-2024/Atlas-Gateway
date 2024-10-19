import axios from "axios";

import { TAdmin } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";
import { TAdminResponse, TApiResponse } from "./types";

export function apiCreateAdmin(payload: TAdmin) {
	return axios({
		method: "POST",
		url: ENDPOINTS.admin.create,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
		data: payload,
	});
}

export function apiAdmins() {
	return axios<TAdminResponse[]>({
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
