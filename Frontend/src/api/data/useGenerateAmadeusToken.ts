import { useMutation } from "@tanstack/react-query";

import { apiGenerateAmadeusToken } from "../service/amadues";

export function useGenerateAmadeusToken(setToken: (token: string) => void) {
	const mutation = useMutation({
		mutationFn: apiGenerateAmadeusToken,
		onSuccess: (data) => {
			setToken(data?.data?.access_token);
		},
	});

	const { mutate } = mutation;

	return { doGenerateAmadeusToken: mutate, ...mutation };
}
