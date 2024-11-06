import { z } from "zod";

export const uploadSchema = z.object({
	file: z
		.instanceof(File)
		.refine((file) => file && file.size <= 5 * 1024 * 1024, {
			message: "File size should be less than 5MB",
		}),
});
