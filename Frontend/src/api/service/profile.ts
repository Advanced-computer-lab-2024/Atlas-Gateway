import axios from "axios";

import { TTourist } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";
import {
	TAdvertiserProfileResponse,
	TTourGuideProfileResponse,
	TTouristProfileResponse,
} from "./types";

export function apiTouristProfile(id: string) {
	return axios<TTouristProfileResponse>({
		method: "GET",
		url: ENDPOINTS.tourist.show(id),
		headers: {
			"Content-Type": "application/json",
			userid: id,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiEditTouristProfile(id: string, data: TTourist) {
	return axios<TTouristProfileResponse>({
		method: "PUT",
		url: ENDPOINTS.tourist.update(id),
		headers: {
			"Content-Type": "application/json",
			userid: id,
		},
		data,
		baseURL: "http://localhost:5000",
	});
}

export function apiSellerProfile(id: string) {
	return axios<TAdvertiserProfileResponse>({
		method: "GET",
		url: ENDPOINTS.seller.show(id),
		headers: {
			"Content-Type": "application/json",
			userid: id,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiAdvertiserProfile(id: string) {
	return axios<TAdvertiserProfileResponse>({
		method: "GET",
		url: ENDPOINTS.advertiser.show(id),
		headers: {
			"Content-Type": "application/json",
			userid: id,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiTourGuideProfile(id: string) {
	return axios<TTourGuideProfileResponse>({
		method: "GET",
		url: ENDPOINTS.tourGuide.show(id),
		headers: {
			"Content-Type": "application/json",
			userid: id,
		},
		baseURL: "http://localhost:5000",
	});
}
