import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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
	apiRemoveBookmarkItinerary,
	apiToggleItineraryStatus,
	apiTourGuideItineraries,
	apiUpdateItinerary,
} from "../service/itineraries";
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
		onSuccess,
	});

	const { mutate } = mutation;

	return { doCreateItinerary: mutate, ...mutation };
}

export function useUpdateItinerary(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: apiUpdateItinerary,
		onSuccess,
	});

	const { mutate } = mutation;

	return { doUpdateItinerary: mutate, ...mutation };
}

export function useDeleteItinerary(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeleteItinerary(_id),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doDeleteItinerary: mutate, ...mutation };
}

export function useBookItinerary(onSuccess: () => void) {
	const { user } = useLoginStore();
	const userId = user?._id ?? "";
	const mutation = useMutation({
		mutationFn: (id: string) => apiBookItinerary(id, userId),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doBookItinerary: mutate, ...mutation };
}

export function useBookmarkItinerary(onSuccess: () => void) {
	const { user } = useLoginStore();
	const userId = user?._id ?? "";
	const mutation = useMutation({
		mutationFn: (id: string) => apiBookmarkItinerary(id, userId),
		onSuccess,
	});
	const { mutate } = mutation;
	return { doBookmarkItinerary: mutate, ...mutation };
}

export function useCancelItineraryBooking(onSuccess: () => void) {
	const { user } = useLoginStore();
	const userId = user?._id ?? "";

	const mutation = useMutation({
		mutationFn: (id: string) => apiCancelItineraryBooking(id, userId),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doCancelItineraryBooking: mutate, ...mutation };
}

export function useRemoveBookmarkItinerary(onSuccess: () => void) {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const mutation = useMutation({
		mutationFn: (id: string) => apiRemoveBookmarkItinerary(id, _id ?? ""),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doRemoveBookmarkItinerary: mutate, ...mutation };
}

export function useFlagItinerary(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (id: string) => apiFlagItinerary(id),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doFlagItinerary: mutate, ...mutation };
}

export function useToggleItineraryStatus(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (id: string) => apiToggleItineraryStatus(id),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doToggleItineraryStatus: mutate, ...mutation };
}
