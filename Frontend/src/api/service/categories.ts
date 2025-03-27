import axios from "axios";

import { TCategory } from "@/types/global";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";

export function apiCreateCategory(payload: TCategory) {
	return axios({
		method: "POST",
		url: ENDPOINTS.category.create,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
		data: payload,
	});
}

export function apiCategories(_id: string | undefined) {
	return axios<TCategory[]>({
		method: "GET",
		url: ENDPOINTS.category.list,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: baseURL,
	});
}

export function apiUpdateCategory(payload: string, _id: string) {
	return axios({
		method: "PUT",
		url: ENDPOINTS.category.update(_id),
		baseURL: baseURL,
		data: payload,
	});
}

export function apiDeleteCategory(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.category.delete(_id),
		baseURL: baseURL,
	});
}
