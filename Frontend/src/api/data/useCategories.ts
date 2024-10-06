import { useQuery } from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";

import { apiCategories } from "../service/categories";
import { useQueryString } from "./useQueryString";

export function useCategories() {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const [query] = useQueryString();

	const { data } = useQuery({
		queryFn: () => apiCategories(_id, query),
		queryKey: ["category", _id, query],
	});

	return { data: data?.data };
}
