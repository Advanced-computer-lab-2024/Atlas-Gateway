import { useMutation, useQuery } from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";
import { TCategory } from "@/types/global";

import {
	apiCategories,
	apiCreateCategory,
	apiDeleteCategory,
	// apiUpdateCategory,
} from "../service/categories";
import { useQueryString } from "./useQueryString";

export function useCreateCategory(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (data: TCategory) => {
			return apiCreateCategory(data);
		},
		onSuccess,
	});
	const { mutate } = mutation;
	return { doCreateCategory: mutate, ...mutation };
}

export function useCategories() {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const [query] = useQueryString();

	const { data, refetch } = useQuery({
		queryFn: () => apiCategories(_id),
		queryKey: ["category", _id, query],
	});

	return { data: data?.data, refetch };
}

export function useDeleteCategory(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (_id: string) => apiDeleteCategory(_id),
		onSuccess,
	});
	const { mutate } = mutation;
	return { doDeleteCategory: mutate, ...mutation };
}
