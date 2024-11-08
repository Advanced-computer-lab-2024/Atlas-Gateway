import axios from "axios";

import { TComplaint } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";

export function apiComplaints(
	_id: string | undefined,
	filters: Record<string, string>,
) {
	return axios<TComplaint[]>({
		method: "GET",
		url: ENDPOINTS.complaint.list,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		params: {
			_id,
			limit: 12,
			...filters,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiProfileComplaints(
	_id: string | undefined,
	filters: Record<string, string>,
) {
	return axios<TComplaint[]>({
		method: "GET",
		url: ENDPOINTS.complaint.listProfile,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		params: {
			_id,
			limit: 12,
			...filters,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiComplaint(id: string | undefined) {
	return axios<TComplaint>({
		method: "GET",
		url: ENDPOINTS.complaint.show(id ?? ""),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiUpdateComplaint(payload: Partial<TComplaint>, _id: string) {
	return axios({
		method: "PUT",
		url: ENDPOINTS.complaint.update(payload._id ?? ""),
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: "http://localhost:5000",
		data: payload,
	});
}

export function apiAddComplaint(_id: string, data: TComplaint) {
	return axios({
		method: "POST",
		url: ENDPOINTS.complaint.create,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: "http://localhost:5000",
		data: data,
	});
}
