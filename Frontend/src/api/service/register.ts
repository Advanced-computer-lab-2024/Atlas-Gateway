import axios from "axios";

import { TRegisterForm, TUploadForm } from "@/Register/types";

import ENDPOINTS from "./ENDPOINTS";
import { TRegisterationResponse } from "./types";

export function apiRegister(payload: TRegisterForm) {
	return axios<TRegisterationResponse>({
		method: "POST",
		url: ENDPOINTS.register,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
		data: payload,
	});
}

export function apiUpload(payload: TUploadForm) {
	return axios<string>({
		method: "POST",
		url: ENDPOINTS.upload,
		headers: {
			"Content-Type": "multipart/form-data",
		},
		baseURL: "http://localhost:5000",
		data: payload,
	});
}
