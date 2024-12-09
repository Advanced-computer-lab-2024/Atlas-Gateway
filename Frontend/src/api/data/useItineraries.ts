import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { toast } from "@/hooks/use-toast";
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";
import { TItinerary } from "@/types/global";

import {
	apiBookItinerary,
	apiBookmarkItinerary,
	apiCancelItineraryBooking,
	apiCreateItinerary,
	apiDeleteItinerary,
	apiFlagItinerary,
	apiItineraries,
	apiItinerary,
	apiItineraryNotification,
	apiPastItineraries,
	apiRemoveBookmarkItinerary,
	apiToggleItineraryStatus,
	apiTourGuideItineraries,
	apiUpcomingItineraries,
	apiUpdateItinerary,
} from "../service/itineraries";
import { onError } from "./onError";
import { useQueryString } from "./useQueryString";

export function useItineraries() {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const [query] = useQueryString();

	const q = useQuery({
		queryFn: () =>
			user?.type === EAccountType.Guide
				? apiTourGuideItineraries(_id, query, EAccountType.Guide)
				: user?.type === EAccountType.Tourist
					? apiItineraries(_id, query, EAccountType.Tourist)
					: apiItineraries(_id, query, EAccountType.Admin),
		queryKey: ["itinerary", _id, query],
	});

	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useItinerary() {
	const { id } = useParams<{
		id: string;
	}>();

	const { data, refetch } = useQuery({
		queryFn: () => apiItinerary(id),
		queryKey: ["itinerary", id],
	});

	return { data: data?.data, refetch };
}

export function useCreateItinerary(onSuccess: () => void) {
	const { user } = useLoginStore();
	const mutation = useMutation({
		mutationFn: (data: TItinerary) => {
			const { _id } = user || {};

			if (!_id) {
				throw new Error("User ID is undefined");
			}

			return apiCreateItinerary(data, _id);
		},
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Itinerary created successfully!",
			});
		},
	});

	const { mutate } = mutation;

	return { doCreateItinerary: mutate, ...mutation };
}

export function useUpdateItinerary(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: apiUpdateItinerary,
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Itinerary updated successfully!",
			});
		},
	});

	const { mutate } = mutation;

	return { doUpdateItinerary: mutate, ...mutation };
}

export function useDeleteItinerary(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeleteItinerary(_id),
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Itinerary deleted successfully!",
			});
		},
	});

	const { mutate } = mutation;

	return { doDeleteItinerary: mutate, ...mutation };
}

export function useBookItinerary(onSuccess: () => void) {
	const { user } = useLoginStore();
	const userId = user?._id ?? "";
	const mutation = useMutation({
		mutationFn: ({
			id,
			paymentType,
			amount,
			promoCode,
			paymentIntentId,
		}: {
			id: string;
			paymentType: string;
			amount: number;
			promoCode: string;
			paymentIntentId?: string;
		}) =>
			apiBookItinerary(
				id,
				paymentType,
				amount,
				userId,
				promoCode,
				paymentIntentId,
			),
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Itinerary booked successfully!",
			});
		},
	});

	const { mutate } = mutation;

	return { doBookItinerary: mutate, ...mutation };
}

export function useBookmarkItinerary(onSuccess: () => void) {
	const { user } = useLoginStore();
	const userId = user?._id ?? "";
	const mutation = useMutation({
		mutationFn: (id: string) => apiBookmarkItinerary(id, userId),
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Itinerary added to bookmarks!",
			});
		},
	});
	const { mutate } = mutation;
	return { doBookmarkItinerary: mutate, ...mutation };
}

export function useCancelItineraryBooking(onSuccess: () => void) {
	const { user } = useLoginStore();
	const userId = user?._id ?? "";

	const mutation = useMutation({
		mutationFn: (id: string) => apiCancelItineraryBooking(id, userId),
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Itinerary booking cancelled successfully!",
			});
		},
	});

	const { mutate } = mutation;

	return { doCancelItineraryBooking: mutate, ...mutation };
}

export function useRemoveBookmarkItinerary(onSuccess: () => void) {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const mutation = useMutation({
		mutationFn: (id: string) => apiRemoveBookmarkItinerary(id, _id ?? ""),
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Itinerary removed from bookmarks!",
			});
		},
	});

	const { mutate } = mutation;

	return { doRemoveBookmarkItinerary: mutate, ...mutation };
}

export function useFlagItinerary(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (id: string) => apiFlagItinerary(id),
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Itinerary flagged successfully!",
			});
		},
	});

	const { mutate } = mutation;

	return { doFlagItinerary: mutate, ...mutation };
}

export function useToggleItineraryStatus(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (id: string) => apiToggleItineraryStatus(id),
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Itinerary status updated successfully!",
			});
		},
	});

	const { mutate } = mutation;

	return { doToggleItineraryStatus: mutate, ...mutation };
}

export function useUpcomingItineraries() {
	const { user } = useLoginStore();
	const { _id, type } = user || {};

	const query = useQuery({
		queryFn: () => {
			if (type !== EAccountType.Tourist) {
				throw new Error("Only tourists can fetch upcoming itineraries");
			}
			if (!_id) {
				throw new Error(
					"Tourist ID is required for upcoming itineraries",
				);
			}
			return apiUpcomingItineraries(_id);
		},
		queryKey: ["upcomingItineraries", _id],
		enabled: type === EAccountType.Tourist && !!_id,
	});

	const { data } = query;

	return { ...query, data: data?.data, meta: data?.data?.metaData };
}

export function usePastItineraries() {
	const { user } = useLoginStore();
	const { _id, type } = user || {};

	const query = useQuery({
		queryFn: () => {
			if (type !== EAccountType.Tourist) {
				throw new Error("Only tourists can fetch past itineraries");
			}
			if (!_id) {
				throw new Error("Tourist ID is required for past itineraries");
			}
			return apiPastItineraries(_id);
		},
		queryKey: ["pastItineraries", _id],
		enabled: type === EAccountType.Tourist && !!_id,
	});

	const { data } = query;

	return { ...query, data: data?.data, meta: data?.data?.metaData };
}

export function useItineraryNotification(onSuccess: () => void) {
	const { user } = useLoginStore();
	const { _id } = user || {};

	const mutation = useMutation({
		mutationFn: (itineraryId: string) => {
			if (!_id) {
				throw new Error("User ID is undefined");
			}
			return apiItineraryNotification(_id,itineraryId);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doNotifyItinerary: mutate, ...mutation };
}

