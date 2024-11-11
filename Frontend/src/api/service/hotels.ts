import axios from "axios";

import { THotels } from "@/types/global";

import { IHotelBooking } from "../../../../Backend/src/Models/Hotel/hotel.model";
import ENDPOINTS, { baseURL } from "./ENDPOINTS";

export function apiListHotels(cityCode: string) {
	return axios<THotels[]>({
		method: "GET",
		url: ENDPOINTS.hotels.list(cityCode),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiBookHotels(data: IHotelBooking, userId: string) {
	return axios<IHotelBooking>({
		method: "POST",
		url: ENDPOINTS.hotels.bookRoom,
		headers: {
			"Content-Type": "application/json",
			userid: userId,
		},
		baseURL: "http://localhost:5000",
		data: data,
	});
}
