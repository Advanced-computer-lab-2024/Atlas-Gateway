import { useMutation } from "@tanstack/react-query";

import { apiSearchFlights } from "../service/flights";

export function useSearchFlights(onSuccess: (response: any) => void) {
	const mutation = useMutation({
		mutationFn: apiSearchFlights,
		onSuccess,
	});

	const { mutate, isPending } = mutation;

	return { doSearchFlights: mutate, ...mutation, isPending };
}
