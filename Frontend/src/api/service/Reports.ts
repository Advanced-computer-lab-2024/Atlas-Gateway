import axios from "axios";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";
import {
	TActivityReportResponse,
	TAdminReportResponse,
	TItineraryReportResponse,
	TProductReportResponse,
	TReportRespone,
} from "./types";

export function apiAdminReport(filter: Record<string, string>) {
	return axios<TAdminReportResponse>({
		method: "GET",
		url: ENDPOINTS.admin.report,
		headers: {
			"Content-Type": "application/json",
		},
		params: {
			...filter,
		},
		baseURL: baseURL,
	});
}

export function apiTourGuideReport(
	_id: string,
	filters: Record<string, string>,
) {
	return axios<TReportRespone<TItineraryReportResponse>>({
		method: "GET",
		url: ENDPOINTS.tourGuide.report(_id),
		headers: {
			"Content-Type": "application/json",
		},
		params: {
			...filters,
		},
		baseURL: baseURL,
	});
}

export function apiAdvertiserReport(
	_id: string,
	filters: Record<string, string>,
) {
	return axios<TReportRespone<TActivityReportResponse>>({
		method: "GET",
		url: ENDPOINTS.advertiser.report(_id),
		headers: {
			"Content-Type": "application/json",
		},
		params: {
			...filters,
		},
		baseURL: baseURL,
	});
}

export function apiTransportationAdvertiserReport(
	_id: string,
	filters: Record<string, string>,
) {
	return axios({
		method: "GET",
		url: ENDPOINTS.transportation_advertiser.report(_id),
		headers: {
			"Content-Type": "application/json",
		},
		params: {
			...filters,
		},

		baseURL: baseURL,
	});
}

export function apiSellerSalesReport(
	_id: string,
	filters: Record<string, string>,
) {
	return axios<TReportRespone<TProductReportResponse>>({
		method: "GET",
		url: ENDPOINTS.seller.salesReport(_id),
		headers: {
			"Content-Type": "application/json",
		},
		params: {
			...filters,
		},
		baseURL: baseURL,
	});
}
