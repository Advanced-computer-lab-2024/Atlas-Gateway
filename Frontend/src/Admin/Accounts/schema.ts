import { z } from "zod";

export const accountSchema = z.object({
	username: z
		.string({ message: "username is required" })
		.min(3, { message: "username must be at least 3 characters long" }),
	email: z.string().email(),
	password: z
		.string({ message: "password is required" })
		.min(8, { message: "Password must be at least 8 characters long" }),
});
