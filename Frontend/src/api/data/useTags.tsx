import { useQuery } from "@tanstack/react-query";

import { useLoginStore } from "@/store/loginStore";

import { apiTags } from "../service/tags";
import { useQueryString } from "./useQueryString";

export function useTags() {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const [query] = useQueryString();

	const { data } = useQuery({
		queryFn: () => apiTags(_id),
		queryKey: ["tag", _id, query],
	});

	return { data: data?.data };
}
