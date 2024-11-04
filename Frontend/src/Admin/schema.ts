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

export const productSchema = z.object({
	name: z
		.string({ message: "Product name is required" })
		.min(5, { message: "Product name must be at least 5 characters long" }),
	price: z.preprocess(
		(val) => Number(val),
		z
			.number({
				invalid_type_error: "Price must be a number",
			})
			.nonnegative("Price cant be negative"),
	),
	quantity: z.preprocess(
		(val) => Number(val),
		z
			.number({
				invalid_type_error: "Available quantity must be a number",
			})
			.nonnegative("quantity cant be negative"),
	),
	description: z
		.string()
		.min(1, { message: "description are required" })
		.min(10, {
			message: "description must be at least 10 characters long",
		}),
	picture: z.string(),
	file: z
		.instanceof(File)
		.refine((file) => file && file.size <= 5 * 1024 * 1024, {
			message: "File size should be less than 5MB",
		}),
});

export const tagOrCategorySchema = z.object({
	name: z.string({ message: "name is required" }).min(5, {
		message: "name must be at least 5 characters long",
	}),
});
