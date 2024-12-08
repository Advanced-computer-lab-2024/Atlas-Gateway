import { z } from "zod";

export const PromoCodeSchema = z.object({
	discountPercentage: z
		.number()
		.min(0, { message: "discount must be at least 0" })
		.max(100, { message: "discount must be at most 100" }),
	expiryDate: z.string(),
});
