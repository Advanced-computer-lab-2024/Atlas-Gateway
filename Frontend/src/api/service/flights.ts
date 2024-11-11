import axios from "axios";

import { TFlights } from "@/types/global";

import { IFlight } from "../../../../Backend/src/Models/Flight/flight.model";
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

export function apiBookFlight(data: IFlight, userId: string) {
	return axios<IFlight>({
		method: "POST",
		url: ENDPOINTS.flights.book,
		headers: {
			"Content-Type": "application/json",
			userid: userId,
		},
		baseURL: "http://localhost:5000",
		data: data,
	});
}
