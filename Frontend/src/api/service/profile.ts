import axios from "axios";

import ENDPOINTS from "./ENDPOINTS";
import { TProfileResponse } from "./types";

export default function apiTouristProfile( id : string) {
	return axios<TProfileResponse>({
		method: "GET",
		url: ENDPOINTS.tourist.show(id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}
