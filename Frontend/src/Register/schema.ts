import { addYears } from "date-fns";
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

export const touristInfoSchema = z
	.object({
		mobile_number: z
			.string({
				message: "Please enter a valid mobile number",
			})
			.min(10, {
				message: "Mobile number must be at least 10 characters long",
			}),
		nationality: z
			.string({ message: "Please select your nationality" })
			.min(1, { message: "Please select your nationality" }),
		date_of_birth: z.date({
			message: "Please enter a valid date of birth",
		}),
		occupation: z
			.string({
				message: "Please select your occupation",
			})
			.min(1, { message: "Please select your occupation" }),
	})
	.superRefine(({ date_of_birth }, ctx) => {
		if (date_of_birth > addYears(new Date(), -18)) {
			ctx.addIssue({
				code: "custom",
				message: "You must be at least 18 years old to register",
				path: ["date_of_birth"],
			});
		}
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

export const productSchema = z.object({
	name: z.string().min(5, { message: "Please enter a name" }),
	description: z.string().min(15, { message: "Please enter a description" }),
	price: z.number().nonnegative({ message: "Please enter a valid price" }),
	quantity: z
		.number()
		.nonnegative({ message: "Please enter a valid quantity" }),
});
