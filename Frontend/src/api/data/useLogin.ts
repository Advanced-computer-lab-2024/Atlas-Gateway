import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useLoginStore } from "@/store/loginStore";

import apiLogin from "../service/login";

export function useLogin() {
	const { setUser } = useLoginStore();
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: apiLogin,
		onSuccess: (data) => {
			const { _id, username } = data.data.user;
			const type = data.data.type;
			setUser({
				_id,
				type,
				username,
			});
			navigate("/");
		},
	});

	const { mutate } = mutation;

	return { doLogin: mutate, ...mutation };
}
