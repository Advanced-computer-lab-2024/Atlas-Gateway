import axios from "axios";

import { TComplaint } from "@/types/global";

import ENDPOINTS from "./ENDPOINTS";

export function apiComplaints(_id: string | undefined) {
	return axios<TComplaint[]>({
		method: "GET",
		url: ENDPOINTS.category.list,
		headers: {
			"Content-Type": "application/json",
			userid: _id,
		},
		baseURL: "http://localhost:5000",
	});
}

export function apiComplaintsCreate(data: TComplaint) {
    return axios({
        method: "POST",
        url: ENDPOINTS.category.create,
        headers: {
            "Content-Type": "application/json",
        },
        baseURL: "http://localhost:5000",
        data: data,
    });
}




