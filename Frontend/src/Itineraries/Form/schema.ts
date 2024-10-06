import { z } from "zod";


export const formSchema = z.object({
	title: z.string().min(5, "Title is required"),
	language: z.string().min(1, "Language of Itinerary is required"),
	price: z
		.number({
			message: "Price must be a number",
		})
		.positive({
			message: "Price must be positive",
		}),
	availability: z
		.number({
			message: "Availability is required",
		})
		.positive({
			message: "Availability must be positive",
		}),
	pickUpLocation: z.string().min(1, "PickUp location is required"),
	dropOffLocation: z.string().min(1, "DropOff location is required"),
	startDateTime: z.string().min(1, "Start Date is required"),
	endDateTime: z.string().min(1, "End Date is required"),
	activities: z.array(
		z.object({
			title: z.string().min(1, "Activity title is required"),
			dateTime: z.string(),
			durationM: z
				.number({
					message: "Duration is required",
				})
				.positive()
				.min(10, "Duration must be at least 10 minutes"),
		}),
	),
	timeline: z.string(),
	accessibility: z.string().min(1, "Accessibility is required"),
	tags: z.array(z.string().min(1, "Tag is required")),
});