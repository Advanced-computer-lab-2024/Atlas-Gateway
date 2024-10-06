import axios from "axios";

import { TCategory } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";

export function apiCategories(
	_id: string | undefined,
	filters: Record<string, string>,
) {
	return axios<TCategory[]>({
		method: "GET",
		url: ENDPOINTS.category.list,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		params: {
			_id,
		},
		baseURL: "http://localhost:5000",
	});
}
