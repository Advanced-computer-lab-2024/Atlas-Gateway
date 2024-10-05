import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useQueryString from "use-query-string";

import { useLoginStore } from "@/store/loginStore";

import { apiProduct, apiProducts } from "../service/Product";

export function useProducts() {
	const { user } = useLoginStore();
	const { id } = user || {};
	const navigate = useNavigate();
	// @ts-expect-error - idk
	const [query] = useQueryString(window.location, navigate);

	const { data } = useQuery({
		queryFn: () => apiProducts(id, query),
		queryKey: ["product", id, query],
	});

	return { data: data?.data };
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
