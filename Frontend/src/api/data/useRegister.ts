import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { TUploadForm } from "@/Register/types";
import { useLoginStore } from "@/store/loginStore";

import { apiRegister, apiUpload } from "../service/register";

export function useRegister() {
	const { setUser } = useLoginStore();
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: apiRegister,
		onSuccess: (data, variables) => {
			const { _id, username } = data.data;
			const { type } = variables;
			setUser({
				_id,
				type,
				username,
			});
			navigate("/");
		},
	});

	const { mutate } = mutation;

	return { doRegister: mutate, ...mutation };
}

export function useUpload() {
	const mutation = useMutation({
		mutationFn: (data: TUploadForm) => {
			return apiUpload(data);
		},
	});
	const { mutate } = mutation;
	return { doUpload: mutate, ...mutation };
}
