import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";
import { TActivity } from "@/types/global";

import {
	apiActivities,
	apiActivity,
	apiAdvertisorActivities,
	apiBookActivity,
	apiBookmarkActivity,
	apiCancelActivityBooking,
	apiCreateActivity,
	apiDeleteActivity,
	apiPastActivities,
	apiRemoveBookmarkActivity,
	apiUpcomingActivities,
	apiUpdateActivity,
} from "../service/activities";
import { useQueryString } from "./useQueryString";

export function useActivities() {
	const { user } = useLoginStore();
	const { _id } = user || {};

	const [query] = useQueryString();

	const q = useQuery({
		queryFn: () =>
			user?.type === EAccountType.Advertiser
				? apiAdvertisorActivities(
						_id,
						query,
						user?.type ?? EAccountType.Advertiser,
					)
				: apiActivities(_id, query, user?.type ?? EAccountType.Guest),
		queryKey: ["activities", _id, query],
	});

	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useActivity() {
	const { id } = useParams<{
		id: string;
	}>();

	const { data, refetch } = useQuery({
		queryFn: () => apiActivity(id),
		queryKey: ["activity", id],
	});

	return { data: data?.data, refetch };
}

export function useCreateActivity(onSuccess: () => void) {
	const { user } = useLoginStore();
	const mutation = useMutation({
		mutationFn: (data: TActivity) => {
			const { _id } = user || {};

			if (!_id) {
				throw new Error("User ID is undefined");
			}

			return apiCreateActivity(data, _id);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doCreateActivity: mutate, ...mutation };
}

export function useUpdateActivity(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: apiUpdateActivity,
		onSuccess,
	});

	const { mutate } = mutation;

	return { doUpdateActivity: mutate, ...mutation };
}

export function useDeleteActivity(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeleteActivity(_id),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doDeleteActivity: mutate, ...mutation };
}

export function useBookActivity(onSuccess: () => void) {
	const { user } = useLoginStore();

	const { _id } = user || {};

	const mutation = useMutation({
		mutationFn: ({
			id,
			paymentType,
			amount,
			paymentIntentId,
		}: {
			id: string;
			paymentType: string;
			amount: number;
			paymentIntentId?: string;
		}) =>
			apiBookActivity(
				id,
				paymentType,
				amount,
				_id ?? "",
				paymentIntentId,
			),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doBookActivity: mutate, ...mutation };
}

export function useBookmarkActivity(onSuccess: () => void) {
	const { user } = useLoginStore();

	const { _id } = user || {};
	
	const mutation = useMutation({
		mutationFn: (id: string) => apiBookmarkActivity(id, _id ?? ""),
		onSuccess,
	});
	const { mutate } = mutation;

	return { doBookmarkActivity: mutate, ...mutation };
}

export function useCancelActivityBooking(onSuccess: () => void) {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const mutation = useMutation({
		mutationFn: (id: string) => apiCancelActivityBooking(id, _id ?? ""),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doCancelActivityBooking: mutate, ...mutation };
}

export function useRemoveBookmarkActivity(onSuccess: () => void) {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const mutation = useMutation({
		mutationFn: (id: string) => apiRemoveBookmarkActivity(id, _id ?? ""),
		onSuccess,
	});

	const { mutate } = mutation;

	return { doRemoveBookmarkActivity: mutate, ...mutation };
}

export function useUpcomingActivities() {
	const { user } = useLoginStore();
	const { _id } = user || {};

	const { data, refetch } = useQuery({
		queryFn: () => {
			if (!_id) {
				throw new Error("User ID is required for upcoming activities");
			}
			return apiUpcomingActivities(_id);
		},
		queryKey: ["upcomingActivities", _id],
		enabled: !!_id, // Ensure the query runs only when _id exists
	});

	return { data: data?.data?.data, meta: data?.data?.metaData, refetch };
}

export function usePastActivities() {
	const { user } = useLoginStore();
	const { _id } = user || {};

	const { data, refetch } = useQuery({
		queryFn: () => {
			if (!_id) {
				throw new Error("User ID is required for past activities");
			}
			return apiPastActivities(_id);
		},
		queryKey: ["pastActivities", _id],
		enabled: !!_id, // Ensure the query runs only when _id exists
	});

	return { data: data?.data?.data, meta: data?.data?.metaData, refetch };
}
