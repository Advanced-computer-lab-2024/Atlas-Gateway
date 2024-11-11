import { z } from "zod";

export const formSchema = z.object({
	originLocationCode: z.string().min(1, "Departure location is required"),
	destinationLocationCode: z.string().min(1, "Destination is required"),
	departureDate: z.string().min(1, "Departure date is required"),
	returnDate: z.string().optional(),
	adults: z.number().int().min(1, "At least one adult is required"),
	travelClass: z.string().min(1, "Class is required"),
});
