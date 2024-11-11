import axios from "axios";

import { TFlights } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";

export function apiSearchFlights(data: TFlights) {
	return axios<string>({
		method: "POST",
		url: ENDPOINTS.flights.search,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
		data: data,
	});
}
