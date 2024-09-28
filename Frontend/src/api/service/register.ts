import axios from "axios";

import { TRegisterForm } from "@/Register/types";

import ENDPOINTS from "./ENDPOINTS";
import { TRegisterationResponse } from "./types";

export default function apiRegister(payload: TRegisterForm) {
	return axios<TRegisterationResponse>({
		method: "POST",
		url: ENDPOINTS.register,
		headers: {
			"Content-Type": "application/json",
		},
		data: payload,
	});
}
