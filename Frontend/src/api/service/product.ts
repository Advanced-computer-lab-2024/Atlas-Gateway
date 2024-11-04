import axios from "axios";

import { TProduct } from "@/types/global";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";
import { TApiResponse } from "./types";

export function apiProducts(
	_id: string | undefined,
	filters: Record<string, string>,
) {
	return axios<TApiResponse<TProduct>>({
		method: "GET",
		url: ENDPOINTS.products.list,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		params: {
			_id,
			limit: 12,
			...filters,
		},
		baseURL: baseURL,
	});
}

export function apiProduct(_id: string | undefined) {
	return axios<TProduct>({
		method: "GET",
		url: ENDPOINTS.products.show(_id ?? ""),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiDeleteProduct(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.products.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiCreateProduct(payload: TProduct, id: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.products.create,
		headers: {
			"Content-Type": "application/json",
			userid: id,
		},
		data: payload,
		baseURL: baseURL,
	});
}

export function apiUpdateProduct(payload: TProduct, _id: string) {
	return axios({
		method: "PUT",
		url: ENDPOINTS.places.update(payload?._id),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: baseURL,
		data: payload,
	});
}
