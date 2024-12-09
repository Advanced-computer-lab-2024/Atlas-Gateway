import { useMutation } from "@tanstack/react-query";

import { TUploadForm } from "@/Register/types";
import { toast } from "@/hooks/use-toast";

import { apiDownload, apiUpload } from "../service/media";
import { onError } from "./onError";

export function useUpload(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (data: TUploadForm) => {
			return apiUpload(data);
		},
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "File uploaded successfully!",
			});
		},
	});
	const { mutate } = mutation;
	return { doUpload: mutate, ...mutation };
}

export function useDownload(onSuccess: (response: any) => void) {
	const mutation = useMutation({
		mutationFn: (filePath: string) => {
			return apiDownload(filePath);
		},
		onSuccess,
	});
	const { mutate } = mutation;
	return { doDownload: mutate, ...mutation };
}
