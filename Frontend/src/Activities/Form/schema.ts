import { z } from "zod";

export const activitySchema = z
	.object({
		name: z
			.string({ message: "name is required" })
			.min(5, { message: "name must be at least 5 characters long" }),
		dateTime: z.string(),
		location: z.string({ message: "location is required" }), // should be modified here by ali
		minPrice: z.preprocess(
			(val) => Number(val),
			z
				.number({ message: "min price is required" })
				.min(0, { message: "min price must be at least 0" }),
		),
		maxPrice: z.preprocess(
			(val) => Number(val),
			z
				.number({ message: "max price is required" })
				.nonnegative({ message: "max price must be at least 0" }),
		),
		specialDiscounts: z.preprocess(
			(val) => Number(val),
			z
				.number({ message: "special discounts are required" })
				.nonnegative({
					message: "special discounts must be at least 0",
				})
				.max(100, { message: "special discounts cannot exceed 100" }),
		),
		tags: z.array(z.string().min(1, "Tag is required")),
		categories: z.array(z.string().min(1, "Category is required")),
		isOpen: z.boolean(),
	})
	.refine((data) => data.maxPrice >= data.minPrice, {
		path: ["minPrice"],
		message: "min price cannot be greater than max price",
	});
