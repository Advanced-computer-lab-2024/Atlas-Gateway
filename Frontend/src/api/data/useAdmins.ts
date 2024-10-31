import { useMutation, useQuery } from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";
import { TAdmin } from "@/types/global";

import { apiAdmins, apiCreateAdmin, apiDeleteAdmin } from "../service/admins";

export function useCreateAdmin(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (data: TAdmin) => {
			return apiCreateAdmin(data);
		},
		onSuccess,
	});
	const { mutate } = mutation;
	return { doCreateAdmin: mutate, ...mutation };
}

export function useAdmins() {
	const { user } = useLoginStore();
	const { _id } = user || {};

	const { data, refetch } = useQuery({
		queryFn: () => apiAdmins(),
		queryKey: ["admin", _id],
		// staleTime: 2 * 60 * 1000, // 2 minutes
	});

	return { data: data?.data, refetch }; // i dont understand the point of data?.data?.data
}

export function useDeleteAdmin(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeleteAdmin(_id),
		onSuccess,
	});
	const { mutate } = mutation;

	return { doDeleteAdmin: mutate, ...mutation };
}
