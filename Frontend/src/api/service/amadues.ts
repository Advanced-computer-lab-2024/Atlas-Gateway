import axios from "axios";

export const clientid = "UlDQ6W2Jh1o1cz4iH4c5imoAkWSSEAGH";
export const clientsecret = "qVqOJMkZZ5aZXsFb";

export function apiGenerateAmadeusToken() {
	return axios({
		method: "POST",
		url: "https://test.api.amadeus.com/v1/security/oauth2/token",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: `grant_type=client_credentials&client_id=${clientid}&client_secret=${clientsecret}`,
	});
}
