import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toast } from "@/hooks/use-toast";
import { useLoginStore } from "@/store/loginStore";
import { EAccountType } from "@/types/enums";

import apiLogin from "../service/login";

export function useLogin() {
	const { setUser } = useLoginStore();
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: apiLogin,
		onError: () => {
			toast({
				title: "Wrong credentials!",
				description: "Please try again",
			});
		},
		onSuccess: (data) => {
			const { _id, username, currency, acceptedTerms, isVerified } =
				data.data.user;
			const type = data.data.type;
			const isUserNotVerifiable = ![
				EAccountType.Guide,
				EAccountType.Advertiser,
				EAccountType.Seller,
				EAccountType.TransportationAdvertiser,
			].includes(data.data.type);
			console.log(data.data);
			setUser({
				_id,
				type,
				username,
				currency: currency || "EGP",
				acceptedTerms,
				isVerified: isUserNotVerifiable ? true : isVerified,
			});
			if (data.data.type === EAccountType.Admin) navigate("/admin");
			if (!isUserNotVerifiable && !isVerified) {
				navigate("/profile");
			} else {
				navigate("/");
			}
		},
	});

	const { mutate } = mutation;

	return { doLogin: mutate, ...mutation };
}
