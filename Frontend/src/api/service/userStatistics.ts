import axios from "axios";

import ENDPOINTS from "./ENDPOINTS";
import { TUserStatisticsResponse } from "./types.ts";

// Fetch total users and new total users statistics.

export function apiFetchUserStatistics() {
	return axios<TUserStatisticsResponse>({
		method: "GET",
		url: ENDPOINTS.userStatistics.list,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}
