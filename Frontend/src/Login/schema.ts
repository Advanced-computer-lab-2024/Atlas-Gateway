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

export const step1 = z.object({
	email: z
		.string({
			message: "Please enter a valid email address",
		})
		.email({ message: "Invalid email address" }),
});

export const step2 = z.object({
	otp: z.string({
		message: "Please enter a valid one time password",
	}),
});

export const step3 = z
	.object({
		username: z.string({
			message: "Please enter your username",
		}),
		password: z
			.string({
				message: "Please enter a valid password",
			})
			.min(8, { message: "Password must be at least 8 characters long" }),
		confirmPassword: z
			.string({
				message: "Please confirm your password",
			})
			.min(8, { message: "Password must be at least 8 characters long" }),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: "Password and confirm password do not match",
				path: ["confirmPassword"],
			});
		}
	});
