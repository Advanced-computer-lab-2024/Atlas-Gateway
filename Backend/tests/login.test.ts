import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	test,
} from "@jest/globals";
import mongoose from "mongoose";
import request from "supertest";

import { MONGO_DB } from "../src/Config/config";
import app from "../src/server";

/* Connecting to the database before each test. */
beforeEach(async () => {
	await mongoose.connect(MONGO_DB.URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
	await mongoose.connection.close();
});
/* Test for getting  user by id. */
// describe("GET users/:id", () => {
//   test("Get user by Id", (done) => {
//     request(app)
//       .get("/users/67388414be4de6f8bbe4477b")
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.name).toBe("John Doe");
//       })
//       .end((err, res) => {
//         if (err) return done(err);
//         return done();
//       });
//   });
// });

/* Test for creating a new user. */
const testUser = {
	name: "maro",
	email: "mmm@mmm.mmm",
	password: "mmm",
};

/* Test for creating a new user. */
describe("POST /signup", () => {
	it("should successfully sign up a new user", async () => {
		const response = await request(app)
			.post("/signup")
			.send(testUser) // Send test data
			.expect(201); // Expect HTTP status 201 Created
	});
});
