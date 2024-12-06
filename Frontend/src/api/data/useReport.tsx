import { useQuery } from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";

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

export function useSalesReport() {
	const { user } = useLoginStore();
	const [query] = useQueryString();

	const q = useQuery({
		queryFn: () => {
			switch (user?.type) {
				case EAccountType.Seller:
					return apiSellerSalesReport(user._id, query);
				case EAccountType.Advertiser:
					return apiAdvertiserSalesReport(user._id, query);
				case EAccountType.Guide:
					return apiTourGuideSalesReport(user._id, query);
				case EAccountType.TransportationAdvertiser:
					return apiTransportationAdvertiserSalesReport(
						user._id,
						query,
					);
				case EAccountType.Admin:
					return apiAdminSalesReport();
				default:
					return apiAdminSalesReport();
			}
		},
		queryKey: ["salesReport", user?._id, query],
	});

	console.log(q);

	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useBookingReport() {
	const { user } = useLoginStore();
	const [query] = useQueryString();
	const q = useQuery({
		queryFn: () => {
			switch (user?.type) {
				case EAccountType.Advertiser:
					return apiAdvertiserBookingReport(user._id, query);
				case EAccountType.Guide:
					return apiTourGuideBookingReport(user._id, query);
				case EAccountType.TransportationAdvertiser:
					return apiTransportationAdvertiserBookingReport(
						user._id,
						query,
					);
			}
		},
		queryKey: ["bookingsReport", user?._id, query],
	});

	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}
