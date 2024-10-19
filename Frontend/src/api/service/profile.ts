import axios from "axios";

import { TAdvetisor, TSeller, TTourGuide, TTourist } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";
import {
	TAdvertiserProfileResponse,
	TSellerProfileResponse,
	TTourGuideProfileResponse,
	TTouristProfileResponse,
} from "./types";

export function apiTourists() {
	return axios<TTouristProfileResponse[]>({
		method: "GET",
		url: ENDPOINTS.tourist.list,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiTouristProfile(_id: string) {
	return axios<TTouristProfileResponse>({
		method: "GET",
		url: ENDPOINTS.tourist.show(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiEditTouristProfile(_id: string, data: TTourist) {
	return axios<TTouristProfileResponse>({
		method: "PUT",
		url: ENDPOINTS.tourist.update(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		data,
		baseURL: "http://localhost:5000",
	});
}

export function apiDeleteTouristProfile(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.tourist.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiSellerProfile(_id: string) {
	return axios<TSellerProfileResponse>({
		method: "GET",
		url: ENDPOINTS.seller.show(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: "http://localhost:5000",
	});
}
export function apiEditSellerProfile(_id: string, data: TSeller) {
	return axios<TAdvertiserProfileResponse>({
		method: "PUT",
		url: ENDPOINTS.seller.update(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		data,
		baseURL: "http://localhost:5000",
	});
}

export function apiAdvertisers() {
	return axios<TAdvertiserProfileResponse[]>({
		method: "GET",
		url: ENDPOINTS.advertiser.list,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiAdvertiserProfile(_id: string) {
	return axios<TAdvertiserProfileResponse>({
		method: "GET",
		url: ENDPOINTS.advertiser.show(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiEditAdvertiserProfile(_id: string, data: TAdvetisor) {
	return axios<TAdvertiserProfileResponse>({
		method: "PUT",
		url: ENDPOINTS.advertiser.update(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		data,
		baseURL: "http://localhost:5000",
	});
}

export function apiDeleteAdvertiserProfile(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.advertiser.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiTourGuides() {
	return axios<TTourGuideProfileResponse[]>({
		method: "GET",
		url: ENDPOINTS.tourGuide.list,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiTourGuideProfile(_id: string) {
	return axios<TTourGuideProfileResponse>({
		method: "GET",
		url: ENDPOINTS.tourGuide.show(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: "http://localhost:5000",
	});
}
export function apiEditTourGuideProfile(_id: string, data: TTourGuide) {
	return axios<TTourGuideProfileResponse>({
		method: "PUT",
		url: ENDPOINTS.tourGuide.update(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		data,
		baseURL: "http://localhost:5000",
	});
}

export function apiDeleteTourGuideProfile(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.tourGuide.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}
