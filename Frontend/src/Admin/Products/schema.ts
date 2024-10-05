import { z } from "zod";

export const productSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Product name is required" })
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
});
