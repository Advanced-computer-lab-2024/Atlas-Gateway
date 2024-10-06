import { z } from "zod";

export const loginSchema = z.object({
	username: z.string({
		message: "Please enter your username",
	}),
	password: z
		.string({
			message: "Please enter a valid password",
		})
		.min(8, { message: "Password must be at least 8 characters long" }),
});
