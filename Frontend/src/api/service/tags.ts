import axios from "axios";

import { TTag } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";

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
