import axios from "axios";

import { THotel } from "@/types/global";

import { IHotelBooking } from "../../../../Backend/src/Models/Hotel/hotel.model";
import ENDPOINTS, { baseURL } from "./ENDPOINTS";

export function apiListHotels(cityCode: string) {
	return axios<THotel[]>({
		method: "GET",
		url: ENDPOINTS.hotels.list(cityCode),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiShowHotel(iataCode: string | null) {
	return axios<THotel>({
		method: "GET",
		url: ENDPOINTS.hotels.show(iataCode ?? ""),
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
