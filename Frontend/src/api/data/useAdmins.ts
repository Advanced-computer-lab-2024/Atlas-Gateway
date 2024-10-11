import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useLoginStore } from "@/store/loginStore";

import { apiCreateAdmin, apiDeleteAdmin } from "../service/admins";

export function useCreateAdmins() {
	const { user } = useLoginStore();
	const { _id } = user || {};

	const { data, refetch } = useQuery({
		queryFn: () => apiCreateAdmin(),
		queryKey: ["admin", _id],
		// staleTime: 10 * 60 * 1000, // 10 minutes
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
