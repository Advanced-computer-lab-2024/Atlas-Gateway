import { z } from "zod";

export const formSchema = z.object({
	originLocationCode: z.string().min(1, "cc location is required"),
	destinationLocationCode: z.string().min(1, "Destination is required"),
	departureDate: z.string().min(1, "Departure time is required"),
	returnDate: z.string().min(1, "Arrival time is required"),
	adults: z.number().int().min(1, "At least one adult is required"),
	travelClass: z.string().min(1, "Class is required"),
});
