import axios from "axios";

import { TNotification } from "@/types/global";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";
import { TApiResponse } from "./types";

export function apiGetNotifications(userId: string) {
	return axios<TNotification[]>({
		method: "GET",
		url: ENDPOINTS.notification.get,
		headers: {
			"Content-Type": "application/json",
			userid: userId, // Ensure 'userid' is correct as per your API specs
		},
		baseURL: baseURL,
	});
}

export function apiMarkNotificationAsRead(_id: string) {
	return axios<TApiResponse<TNotification>>({
		method: "POST",
		url: ENDPOINTS.notification.read(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiDeleteNotification(
	_id: string,
	usertype: string,
	userId: string,
) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.notification.delete(_id),
		headers: {
			"Content-Type": "application/json",
			usertype: usertype,
			userid: userId,
		},
		baseURL: baseURL,
	});
}
