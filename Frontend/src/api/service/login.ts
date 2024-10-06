import axios from "axios";


import ENDPOINTS from "./ENDPOINTS";
import { TLoginResponse } from "./types";
import { TLoginForm } from "@/Login/types";

export default function apiLogin(payload: TLoginForm) {
	return axios<TLoginResponse>({
		method: "POST",
		url: ENDPOINTS.login,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: "http://localhost:5000",
		data: payload,
	});
}
