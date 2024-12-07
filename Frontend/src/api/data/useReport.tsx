import { useQuery } from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";

import {
	apiAdminSalesReport,
	apiAdvertiserBookingReport,
	apiAdvertiserSalesReport,
	apiSellerSalesReport,
	apiTourGuideBookingReport,
	apiTourGuideSalesReport,
	apiTransportationAdvertiserBookingReport,
	apiTransportationAdvertiserSalesReport,
} from "../service/Reports";
import { useQueryString } from "./useQueryString";

export function useAdminSalesReport() {
	const { user } = useLoginStore();
	const [query] = useQueryString();

	const q = useQuery({
		queryFn: () => {
			return apiAdminSalesReport();
		},
		queryKey: ["salesReport", user?._id, query],
	});
	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useAdvertiserSalesReport() {
	const { user } = useLoginStore();
	const [query] = useQueryString();
	const q = useQuery({
		queryFn: () => {
			if (!user?._id) {
				return; // idk how to handle this
			}
			return apiAdvertiserSalesReport(user._id, query);
		},
		queryKey: ["salesReport", user?._id, query],
	});
	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useTourGuideSalesReport() {
	const { user } = useLoginStore();
	const [query] = useQueryString();
	const q = useQuery({
		queryFn: () => {
			if (!user?._id) {
				return; // idk how to handle this
			}
			return apiTourGuideSalesReport(user._id, query);
		},
		queryKey: ["salesReport", user?._id, query],
	});
	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useTransportationAdvertiserSalesReport() {
	const { user } = useLoginStore();
	const [query] = useQueryString();
	const q = useQuery({
		queryFn: () => {
			if (!user?._id) {
				return; // idk how to handle this
			}
			return apiTransportationAdvertiserSalesReport(user._id, query);
		},
		queryKey: ["salesReport", user?._id, query],
	});
	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useSellerSalesReport() {
	const { user } = useLoginStore();
	const [query] = useQueryString();
	const q = useQuery({
		queryFn: () => {
			if (!user?._id) {
				return; // idk how to handle this
			}
			return apiSellerSalesReport(user._id, query);
		},
		queryKey: ["salesReport", user?._id, query],
	});
	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useAdvertiserBookingReport() {
	const { user } = useLoginStore();
	const [query] = useQueryString();
	const q = useQuery({
		queryFn: () => {
			if (!user?._id) {
				return; // idk how to handle this
			}
			return apiAdvertiserBookingReport(user._id, query);
		},
		queryKey: ["bookingsReport", user?._id, query],
	});
	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useTourGuideBookingReport() {
	const { user } = useLoginStore();
	const [query] = useQueryString();
	const q = useQuery({
		queryFn: () => {
			if (!user?._id) {
				return; // idk how to handle this
			}
			return apiTourGuideBookingReport(user._id, query);
		},
		queryKey: ["bookingsReport", user?._id, query],
	});
	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useTransportationAdvertiserBookingReport() {
	const { user } = useLoginStore();
	const [query] = useQueryString();
	const q = useQuery({
		queryFn: () => {
			if (!user?._id) {
				return; // idk how to handle this
			}
			return apiTransportationAdvertiserBookingReport(user._id, query);
		},
		queryKey: ["bookingsReport", user?._id, query],
	});
	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}
