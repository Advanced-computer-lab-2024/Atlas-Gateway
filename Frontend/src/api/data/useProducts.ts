import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useLoginStore } from "@/store/loginStore";

import { apiProduct, apiProducts } from "../service/product";
import { useQueryString } from "./useQueryString";

export function useProducts() {
	const { user } = useLoginStore();
	const { _id } = user || {};
	const [query] = useQueryString();

	const { data, refetch } = useQuery({
		queryFn: () => apiProducts(_id, query),
		queryKey: ["product", _id, query],
	});

	return { data: data?.data?.data, meta: data?.data?.metaData, refetch };
}

export function useProduct() {
	const { id } = useParams<{
		id: string;
	}>();

	const { data } = useQuery({
		queryFn: () => apiProduct(id),
		queryKey: ["product", id],
	});

	return { data: data?.data };
}
