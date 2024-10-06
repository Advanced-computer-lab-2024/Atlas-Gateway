import axios from "axios";



import { TAdvetisor, TSeller, TTourGuide, TTourist } from "@/types/global";



import ENDPOINTS from "./ENDPOINTS";
import { TAdvertiserProfileResponse, TTourGuideProfileResponse, TTouristProfileResponse } from "./types";


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

export function apiSellerProfile(_id: string) {
	return axios<TAdvertiserProfileResponse>({
		method: "GET",
		url: ENDPOINTS.seller.show(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: "http://localhost:5000",
	});
}
export function apiEditSellerProfile(id: string, data: TSeller) {
    return axios<TAdvertiserProfileResponse>({
        method: "PUT",
        url: ENDPOINTS.seller.update(id),
        headers: {
            "Content-Type": "application/json",
            userid: id,
        },
        data,
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
export function apiEditAdvertiserProfile(id: string, data: TAdvetisor) {
	return axios<TAdvertiserProfileResponse>({
		method: "PUT",
		url: ENDPOINTS.advertiser.update(id),
		headers: {
			"Content-Type": "application/json",
			userid: id,
		},
		data,
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
export function apiEditTourGuideProfile(id: string, data: TTourGuide) {
	return axios<TTourGuideProfileResponse>({
		method: "PUT",
		url: ENDPOINTS.tourGuide.update(id),
		headers: {
			"Content-Type": "application/json",
			userid: id,
		},
		data,
		baseURL: "http://localhost:5000",
	});
}