import axios from "axios";

import {
	IHotelBooking,
	THotel,
	THotelOffers,
	THotelRating,
} from "@/types/global";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";

export function apiListHotels(
	cityCode: string,
	filters: Record<string, string>,
) {
	return axios<THotel[]>({
		method: "GET",
		url: ENDPOINTS.hotels.list(cityCode),
		headers: {
			"Content-Type": "application/json",
		},
		params: {
			...filters,
		},
		baseURL: baseURL,
	});
}

export function apiShowHotelRatings(id: string | null, token: string | null) {
	return axios<THotelRating>({
		method: "GET",
		url: `https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments?hotelIds=${id}`,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
}

export function apiShowHotelOffers(
	id: string | null,
	token: string | null,
	filters: Record<string, string>,
) {
	return axios<THotelOffers>({
		method: "GET",
		url: `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${id}`,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		params: {
			...filters,
		},
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
