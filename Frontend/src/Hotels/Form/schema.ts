import { z } from "zod";

export const formSchema = z.object({
	cityCode: z.string(),
	checkInDate: z.string(),
	checkOutDate: z.string(),
	adults: z.number(),
});
