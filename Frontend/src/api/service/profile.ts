import axios from "axios";

import {
	TAdvetisor,
	TGovernor,
	TPassword,
	TSeller,
	TTourGuide,
	TTourist,
	TTransportationAdvertiser,
} from "@/types/global";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";
import {
	TAdvertiserProfileResponse,
	TGovernorProfileResponse,
	TSellerProfileResponse,
	TTourGuideProfileResponse,
	TTouristProfileResponse,
	TTransportationAdvertiserProfileResponse,
} from "./types";

export function apiTourists() {
	return axios<TTouristProfileResponse[]>({
		method: "GET",
		url: ENDPOINTS.tourist.list,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
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
		baseURL: baseURL,
	});
}

export function apiChangePassword(username: string, data: TPassword) {
	return axios({
		method: "PUT",
		url: ENDPOINTS.changePassword,
		data: {
			username: username,
			password: data.password,
		},
		baseURL: baseURL,
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
		baseURL: baseURL,
	});
}

export function apiDeleteTouristProfile(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.tourist.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiRequestDeleteTouristProfile(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.tourist.requestDelete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiSellers() {
	return axios<TSellerProfileResponse[]>({
		method: "GET",
		url: ENDPOINTS.seller.list,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
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
		baseURL: baseURL,
	});
}
export function apiEditSellerProfile(_id: string, data: Partial<TSeller>) {
	return axios<TAdvertiserProfileResponse>({
		method: "PUT",
		url: ENDPOINTS.seller.update(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		data,
		baseURL: baseURL,
	});
}
export function apiDeleteSeller(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.seller.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiRequestDeleteSellerProfile(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.seller.requestDelete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiGovernors() {
	return axios<TGovernorProfileResponse[]>({
		method: "GET",
		url: ENDPOINTS.governor.list,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}
export function apiGovernorProfile(_id: string) {
	return axios<TGovernorProfileResponse>({
		method: "GET",
		url: ENDPOINTS.governor.showGoverner(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: "http://localhost:5000",
	});
}
export function apiEditGovernorProfile(_id: string, data: Partial<TGovernor>) {
	return axios<TGovernorProfileResponse>({
		method: "PUT",
		url: ENDPOINTS.governor.update(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		data,
		baseURL: "http://localhost:5000",
	});
}
export function apiDeleteGovernor(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.governor.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
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
		baseURL: baseURL,
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
		baseURL: baseURL,
	});
}

export function apiEditAdvertiserProfile(
	_id: string,
	data: Partial<TAdvetisor>,
) {
	return axios<TAdvertiserProfileResponse>({
		method: "PUT",
		url: ENDPOINTS.advertiser.update(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		data,
		baseURL: baseURL,
	});
}

export function apiDeleteAdvertiserProfile(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.advertiser.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiRequestDeleteAdvertiserProfile(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.advertiser.requestDelete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiTransportationAdvertisers() {
	return axios<TTransportationAdvertiserProfileResponse[]>({
		method: "GET",
		url: ENDPOINTS.transportation_advertiser.list,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiTransportationAdvertiserProfile(_id: string) {
	return axios<TTransportationAdvertiserProfileResponse>({
		method: "GET",
		url: ENDPOINTS.transportation_advertiser.show(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiEditTransportationAdvertiserProfile(
	_id: string,
	data: Partial<TTransportationAdvertiser>,
) {
	return axios<TTransportationAdvertiserProfileResponse>({
		method: "PUT",
		url: ENDPOINTS.transportation_advertiser.update(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		data,
		baseURL: "http://localhost:5000",
	});
}

export function apiDeleteTransportationAdvertiserProfile(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.transportation_advertiser.delete(_id),
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
		baseURL: baseURL,
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
		baseURL: baseURL,
	});
}
export function apiEditTourGuideProfile(
	_id: string,
	data: Partial<TTourGuide>,
) {
	return axios<TTourGuideProfileResponse>({
		method: "PUT",
		url: ENDPOINTS.tourGuide.update(_id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		data,
		baseURL: baseURL,
	});
}

export function apiDeleteTourGuideProfile(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.tourGuide.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiRequestDeleteTourGuideProfile(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.tourGuide.requestDelete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}
