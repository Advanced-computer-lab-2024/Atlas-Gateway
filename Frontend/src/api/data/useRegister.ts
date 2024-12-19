import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";



import { useLoginStore } from "@/store/loginStore";



import { apiRegister } from "../service/register";
import { EAccountType } from "@/types/enums";


export function useRegister() {
	const { setUser } = useLoginStore();
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: apiRegister,
		onSuccess: (data, variables) => {
			const { _id, username } = data.data;
			const { type } = variables;
			const isUserNotVerifiable = ![
				EAccountType.Guide,
				EAccountType.Advertiser,
				EAccountType.Seller,
				EAccountType.TransportationAdvertiser,
			].includes(type);
			setUser({
				_id,
				type,
				username,
				currency: "EGP",
				isVerified: isUserNotVerifiable ? true : false,

			});
			navigate("/");
		},
	});

	const { mutate } = mutation;

	return { doRegister: mutate, ...mutation };
}