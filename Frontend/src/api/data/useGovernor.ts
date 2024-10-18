import { useMutation, useQuery } from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";
import { TGovernor } from "@/types/global";

import {
	apiCreateGovernor,
	apiDeleteGovernor,
	apiGovernors,
} from "../service/governor";

export function useCreateGovernor(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (data: TGovernor) => {
			return apiCreateGovernor(data);
		},
		onSuccess,
	});
	const { mutate } = mutation;
	return { doCreateGovernor: mutate, ...mutation };
}

export function useGovernors() {
	const { user } = useLoginStore();
	const { _id } = user || {};

	const { data, refetch } = useQuery({
		queryFn: () => apiGovernors(),
		queryKey: ["governor", _id],
		// stale time
	});
	return { data: data?.data, refetch }; // i dont understand the point of data?.data?.data
}

export function useDeleteGovernor(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeleteGovernor(_id),
		onSuccess,
	});
	const { mutate } = mutation;

	return { doDeleteGovernor: mutate, ...mutation };
}
