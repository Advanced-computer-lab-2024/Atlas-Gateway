import { useMutation } from "@tanstack/react-query";

import apiRegister from "../service/register";

export function useRegister() {
	const mutation = useMutation({
		mutationFn: apiRegister,
	});

	const { mutate } = mutation;

	return { doRegister: mutate, ...mutation };
}
