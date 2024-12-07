import axios from "axios";

import { TProduct } from "@/types/global";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";
import { TApiResponse } from "./types";

export function apiProducts(
	_id: string | undefined,
	type: string | undefined,
	filters: Record<string, string>,
) {
	return axios<TApiResponse<TProduct>>({
		method: "GET",
		url: ENDPOINTS.products.list,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
			usertype: type,
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

export function apiCreateProduct(payload: Partial<TProduct>, id: string) {
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

export function apiUpdateProduct(payload: Partial<TProduct>, _id: string) {
	// needs to be modified later
	return axios({
		method: "PUT",
		url: ENDPOINTS.products.update(payload?._id!),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: baseURL,
		data: payload,
	});
}

export function apiAddWishlistProduct(_id: string, userId: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.products.addWishlist(_id),
		headers: {
			"Content-Type": "application/json",
			userid: userId,
		},
		baseURL: baseURL,
	});
}

export function apiRemoveWishlistProduct(_id: string, userId: string) {
	return axios({
		method: "POST",
		url: ENDPOINTS.products.removeWishlist(_id),
		headers: {
			"Content-Type": "application/json",
			userid: userId,
		},
		baseURL: baseURL,
	});
}