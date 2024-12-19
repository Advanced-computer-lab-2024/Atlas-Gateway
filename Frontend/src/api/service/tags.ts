import axios from "axios";

import { TTag } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";

export function apiCreateTag(payload: TTag) {
	return axios({
		method: "POST",
		url: ENDPOINTS.tag.create,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
		data: payload,
	});
}

export function apiTags(_id: string | undefined) {
	return axios<TTag[]>({
		method: "GET",
		url: ENDPOINTS.tag.list,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiDeleteTag(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.tag.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}
