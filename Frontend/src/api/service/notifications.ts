import axios from "axios";
import { TNotification } from "@/types/global";
import ENDPOINTS, { baseURL } from "./ENDPOINTS";
import { TApiResponse } from "./types";

export function apiGetNotifications(userId: string) {
  return axios<TApiResponse<TNotification[]>>({
    method: 'GET',
    url: ENDPOINTS.notification.get,
    headers: {
      'Content-Type': 'application/json',
      'userid': userId, // Ensure 'userid' is correct as per your API specs
    },
    baseURL: baseURL,
  })
    .then(response => {
      return response.data; // Return the response data directly (if required)
    })
    .catch(error => {
      // Handle errors
      console.error("Error fetching notifications:", error);
      throw error; // Optionally rethrow the error if you want to handle it elsewhere
    });
}
  
  export function apiMarkNotificationAsRead(_id: string) {
    return axios<TApiResponse<TNotification>>({
      method: 'POST',
      url: ENDPOINTS.notification.read(_id),
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: baseURL,
    });
  }

  export function apiDeleteNotification(_id: string) {
	return axios({
		method: "DELETE",
		url: ENDPOINTS.notification.delete(_id),
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}