import axios from "axios";



import { THotels } from "@/types/global";



import { IHotelBooking } from "../../../../Backend/src/Models/Hotel/hotel.model";
import ENDPOINTS from "./ENDPOINTS";


export function apiSearchHotels(data: THotels) {
	return axios<string>({
		method: "POST",
		url: ENDPOINTS.hotels.search,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
		data: data,
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