import axios from "axios";

import { TAdmin } from "@/types/global";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";
import { TAdminResponse } from "./types";

export function apiCreateAdmin(payload: TAdmin) {
	return axios({
		method: "POST",
		url: ENDPOINTS.admin.create,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
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
		baseURL: baseURL,
	});
}

export function apiDeleteAdmin(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.admin.delete(_id),
		headers: {
			"content-type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiSalesReport() {
	return axios({
		method: "GET",
		url: ENDPOINTS.admin.report,
		headers: {
			"content-type": "application/json",
		},
		baseURL: baseURL,
	});
}
