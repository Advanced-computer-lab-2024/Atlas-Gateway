import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { useLoginStore } from "@/store/loginStore";
import { TTag } from "@/types/global";

import { apiCreateTag, apiDeleteTag, apiTags } from "../service/tags";
import { onError } from "./onError";
import { useQueryString } from "./useQueryString";

export function useCreateTag(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (data: TTag) => {
			return apiCreateTag(data);
		},
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Tag created successfully!",
			});
		},
	});
	const { mutate } = mutation;
	return { doCreateTag: mutate, ...mutation };
}

export function useTags() {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const [query] = useQueryString();

	const { data, refetch } = useQuery({
		queryFn: () => apiTags(_id),
		queryKey: ["tag", _id, query],
	});

	return { data: data?.data, refetch };
}

export function useDeleteTag(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (id: string) => apiDeleteTag(id),
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Tag deleted successfully!",
			});
		},
	});
	const { mutate } = mutation;
	return { doDeleteTag: mutate, ...mutation };
}
