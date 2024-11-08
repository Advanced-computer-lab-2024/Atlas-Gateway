import { z } from "zod";

export const formSchema = z.object({
	title: z
		.string({
			required_error: "Title is required",
		})
		.min(5, "Title must be at least 5 characters"),
	body: z
		.string({
			required_error: "Body is required",
		})
		.min(10, "Body must be at least 10 characters"),
	date: z.string({
		required_error: "Date is required",
	}),
});
