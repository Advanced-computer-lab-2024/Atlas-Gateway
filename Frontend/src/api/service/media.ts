import axios from "axios";

import { TUploadForm } from "@/Register/types";

import ENDPOINTS, { baseURL } from "./ENDPOINTS";

export function apiUpload(payload: TUploadForm) {
	return axios<string>({
		method: "POST",
		url: ENDPOINTS.media.upload,
		headers: {
			"Content-Type": "multipart/form-data",
		},
		baseURL: baseURL,
		data: payload,
	});
}

export function apiDownload(filePath: string) {
	return axios<string>({
		method: "POST",
		url: ENDPOINTS.media.download,
		baseURL: baseURL,
		data: { filePath },
	});
}
