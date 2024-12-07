import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";



import { useLoginStore } from "@/store/loginStore";
import { TProduct } from "@/types/global";



import { apiAddWishlistProduct, apiCreateProduct, apiProduct, apiProducts, apiRemoveWishlistProduct, apiUpdateProduct } from "../service/product";
import { useQueryString } from "./useQueryString";


export function useProducts() {
	const { user } = useLoginStore();
	const { _id, type } = user || {};
	const [query] = useQueryString();

	const { data, refetch } = useQuery({
		queryFn: () => apiProducts(_id, type, query),
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

export function useCreateProduct(onSuccess: () => void) {
	const { user } = useLoginStore();

	const mutation = useMutation({
		mutationFn: (product: Partial<TProduct>) => {
			if (!user?._id) {
				throw new Error("User is not defined");
			}
			return apiCreateProduct(product, user._id);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doCreateProduct: mutate, ...mutation };
}

export function useUpdateProduct(onSuccess: () => void) {
	const { user } = useLoginStore();
	const mutation = useMutation({
		mutationFn: (product: Partial<TProduct>) => {
			if (!user) {
				throw new Error("User is not defined");
			}
			return apiUpdateProduct(product, user._id);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doUpdateProduct: mutate, ...mutation };
}

export function useAddWishlist(onSuccess: () => void) {
	const { user } = useLoginStore();
	const mutation = useMutation({
		mutationFn: (productId: string) => {
			if (!user) {
				throw new Error("User is not defined");
			}
			return apiAddWishlistProduct(productId, user._id);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doAddWishlist: mutate, ...mutation };
}

export function useRemoveWishlist(onSuccess: () => void) {
	const { user } = useLoginStore();
	const mutation = useMutation({
		mutationFn: (productId: string) => {
			if (!user) {
				throw new Error("User is not defined");
			}
			return apiRemoveWishlistProduct(productId, user._id);
		},
		onSuccess,
	});

	const { mutate } = mutation;

	return { doRemoveWishlist: mutate, ...mutation };
}