import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useLoginStore } from "@/store/loginStore";

import apiRegister from "../service/register";

export function useRegister() {
	const { setUser } = useLoginStore();
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: apiRegister,
		onSuccess: (data) => {
			const { _id, type, username } = data.data;
			setUser({
				id: _id,
				type,
				username,
			});
			navigate("/");
		},
	});

	const { mutate } = mutation;

	return { doRegister: mutate, ...mutation };
}
