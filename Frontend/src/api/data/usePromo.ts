import { useMutation, useQuery } from "@tanstack/react-query";



import { useLoginStore } from "@/store/loginStore";
import { TPromo } from "@/types/global";



import { apiCreatePromo, apiPromoCodes } from "../service/promo";
import { onError } from "./onError";
import { toast } from "@/hooks/use-toast";


export function useCreatePromoCode(onSuccess: (data: any) => void) {
	const mutation = useMutation({
		mutationFn: (data: Partial<TPromo>) => apiCreatePromo(data),
		onError,
		onSuccess: (data) => {
			onSuccess(data);
			toast({
				title: "Promocode created successfully!",
			});
		},
	});

	const { mutate } = mutation;
	return { doCreatePromoCode: mutate, ...mutation };
}

export function usePromoCodes() {
	const { user } = useLoginStore();
	const { _id } = user || {};

	const { data, refetch } = useQuery({
		queryFn: () => apiPromoCodes(),
		queryKey: ["promoCodes", _id],
	});

	return { data: data?.data, refetch };
}