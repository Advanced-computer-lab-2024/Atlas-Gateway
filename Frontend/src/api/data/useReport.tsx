import { useQuery } from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";

import {
	apiAdminReport,
	apiAdvertiserReport,
	apiSellerSalesReport,
	apiTourGuideReport,
	apiTransportationAdvertiserReport,
} from "../service/Reports";
import { useQueryString } from "./useQueryString";

export function useAdminReport() {
	const { user } = useLoginStore();
	const [query] = useQueryString();

	const q = useQuery({
		queryFn: () => {
			return apiAdminReport(query);
		},
		queryKey: ["salesReport", user?._id, query],
	});
	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useAdvertiserReport() {
	const { user } = useLoginStore();
	const [query] = useQueryString();
	const q = useQuery({
		queryFn: () => {
			if (!user?._id) {
				return; // idk how to handle this
			}
			return apiAdvertiserReport(user._id, query);
		},
		queryKey: ["salesReport", user?._id, query],
	});
	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useTourGuideReport() {
	const { user } = useLoginStore();
	const [query] = useQueryString();
	const q = useQuery({
		queryFn: () => {
			if (!user?._id) {
				return; // idk how to handle this
			}
			return apiTourGuideReport(user._id, query);
		},
		queryKey: ["salesReport", user?._id, query],
	});
	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useTransportationAdvertiserReport() {
	const { user } = useLoginStore();
	const [query] = useQueryString();
	const q = useQuery({
		queryFn: () => {
			if (!user?._id) {
				return; // idk how to handle this
			}
			return apiTransportationAdvertiserReport(user._id, query);
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
