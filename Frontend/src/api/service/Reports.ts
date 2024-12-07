import axios from "axios";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";
import {
	TActivityReportResponse,
	TAdminReportResponse,
	TItineraryReportResponse,
	TProductReportResponse,
	TReportRespone,
} from "./types";

export function apiAdminSalesReport() {
	return axios<TAdminReportResponse>({
		method: "GET",
		url: ENDPOINTS.admin.report,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiTourGuideSalesReport(
	_id: string,
	filters: Record<string, string>,
) {
	return axios<TReportRespone<TItineraryReportResponse>>({
		method: "GET",
		url: ENDPOINTS.tourGuide.salesReport(_id),
		headers: {
			"Content-Type": "application/json",
		},
		params: {
			...filters,
		},
		baseURL: baseURL,
	});
}

export function apiAdvertiserSalesReport(
	_id: string,
	filters: Record<string, string>,
) {
	return axios<TReportRespone<TActivityReportResponse>>({
		method: "GET",
		url: ENDPOINTS.advertiser.salesReport(_id),
		headers: {
			"Content-Type": "application/json",
		},
		params: {
			...filters,
		},
		baseURL: baseURL,
	});
}

export function apiTransportationAdvertiserSalesReport(
	_id: string,
	filters: Record<string, string>,
) {
	return axios({
		method: "GET",
		url: ENDPOINTS.transportation_advertiser.salesReport(_id),
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

export function apiTourGuideBookingReport(
	_id: string,
	filters: Record<string, string>,
) {
	return axios<TReportRespone<TItineraryReportResponse>>({
		method: "GET",
		url: ENDPOINTS.tourGuide.bookingReport(_id),
		headers: {
			"Content-Type": "application/json",
		},
		params: {
			...filters,
		},
		baseURL: baseURL,
	});
}

export function apiAdvertiserBookingReport(
	_id: string,
	filters: Record<string, string>,
) {
	return axios<TReportRespone<TActivityReportResponse>>({
		method: "GET",
		url: ENDPOINTS.advertiser.bookingReport(_id),
		headers: {
			"Content-Type": "application/json",
		},
		params: {
			...filters,
		},
		baseURL: baseURL,
	});
}

export function apiTransportationAdvertiserBookingReport(
	_id: string,
	filters: Record<string, string>,
) {
	return axios({
		method: "GET",
		url: ENDPOINTS.transportation_advertiser.bookingReport(_id),
		headers: {
			"Content-Type": "application/json",
		},
		params: {
			...filters,
		},
		baseURL: baseURL,
	});
}
