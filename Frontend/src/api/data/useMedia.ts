import { useMutation } from "@tanstack/react-query";

import { TUploadForm } from "@/Register/types";

import { apiUpload } from "../service/media";

export function useUpload(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (data: TUploadForm) => {
			return apiUpload(data);
		},
		onSuccess,
	});
	const { mutate } = mutation;
	return { doUpload: mutate, ...mutation };
}
