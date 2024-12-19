import { z } from "zod";

export const uploadSchema = z.object({
	file: z
		.instanceof(File)
		.refine((file) => file && file.size <= 5 * 1024 * 1024, {
			message: "File size should be less than 5MB",
		}),
});

export const otpSchema = z.object({
	otp: z.string().length(6, { message: "OTP should be 6 characters long" }),
});
