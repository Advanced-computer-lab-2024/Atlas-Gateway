import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useLoginStore } from "@/store/loginStore";

import {
	apiActivities,
	apiActivity,
	apiCreateActivity,
	apiDeleteActivity,
	apiUpdateActivity,
} from "../service/activities";
import { useQueryString } from "./useQueryString";

export function useActivities() {
	const { user } = useLoginStore();
	const { _id } = user || {};

	const [query] = useQueryString();

	const q = useQuery({
		queryFn: () => apiActivities(_id, query),
		queryKey: ["activities", _id, query],
	});

	const { data } = q;

	return { ...q, data: data?.data?.data, meta: data?.data?.metaData };
}

export function useActivity() {
	const { id } = useParams<{
		id: string;
	}>();

	const { data } = useQuery({
		queryFn: () => apiActivity(id),
		queryKey: ["activity", id],
	});

	return { data: data?.data };
}

export function useCreateActivity(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: apiCreateActivity,
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
