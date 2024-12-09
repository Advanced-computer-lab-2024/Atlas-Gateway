import { useMutation, useQuery } from "@tanstack/react-query";



import { toast } from "@/hooks/use-toast";
import { useLoginStore } from "@/store/loginStore";
import { TAdmin } from "@/types/global";



import { apiAdmins, apiCreateAdmin, apiDeleteAdmin } from "../service/admins";
import { onError } from "./onError";


export function useCreateAdmin(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (data: TAdmin) => {
			return apiCreateAdmin(data);
		},
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Admin created successfully!",
			});
		},
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

	return { data: data?.data, refetch };
}

export function useDeleteAdmin(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeleteAdmin(_id),
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Admin deleted successfully!",
			});
		},
	});
	const { mutate } = mutation;

	return { doDeleteAdmin: mutate, ...mutation };
}