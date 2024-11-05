import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { TUploadForm } from "@/Register/types";

import { apiDownload, apiUpload } from "../service/media";

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

export function useDownload() {
	const mutation = useMutation((filePath: string) => apiDownload(filePath));

	return { doDownload: mutation.mutateAsync, ...mutation };
}
