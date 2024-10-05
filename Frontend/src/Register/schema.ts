import { z } from "zod";

import { EAccountType } from "@/types/enums";

export const accountTypeSchema = z.object({
	type: z.enum(
		[
			EAccountType.Tourist,
			EAccountType.Guide,
			EAccountType.Seller,
			EAccountType.Advertiser,
		],
		{
			message: "Please select an account type to continue",
		},
	),
});

export const touristInfoSchema = z.object({
	mobileNumber: z
		.string({
			message: "Please enter a valid mobile number",
		})
		.min(10, {
			message: "Mobile number must be at least 10 characters long",
		}),
	nationality: z
		.string({ message: "Please select your nationality" })
		.min(1, { message: "Please select your nationality" }),
	dob: z.date({
		message: "Please enter a valid date of birth",
	}),
	occupation: z
		.string({
			message: "Please select your occupation",
		})
		.min(1, { message: "Please select your occupation" }),
});

export const accountInfoSchema = z
	.object({
		username: z
			.string({
				message: "Please enter a valid username",
			})
			.min(3, {
				message: "Please enter a username longer than 3 characters",
			}),
		email: z
			.string({
				message: "Please enter a valid email address",
			})
			.email({ message: "Invalid email address" }),
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
