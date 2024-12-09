import {
	describe,
	it,
} from "@jest/globals";
import request from "supertest";

import server from "../server";

/* Test for creating a new user. */
const testUser = {
	name: "maro" + new Date().getTime(),
	email: "email@gmail.com",
	password: "12345678",
};

/* Test for creating a new user. */
describe("POST /create", () => {
	let id;
	it("should successfully sign up a new user", async () => {
		const response = await request(server)
			.post("/api/register/create")
			.send(testUser);
		
		expect(response.statusCode).toEqual(201)
	});

	// it("should delete created user", 
});
