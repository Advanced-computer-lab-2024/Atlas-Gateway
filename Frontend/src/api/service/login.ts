import axios from "axios";


import ENDPOINTS from "./ENDPOINTS";
import { TRegisterationResponse } from "./types";
import { TLoginForm } from "@/Login/types";

export default function apiLogin(payload: TLoginForm) {
	return axios<TRegisterationResponse>({
		method: "POST",
		url: ENDPOINTS.login,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
		data: payload,
	});
}
