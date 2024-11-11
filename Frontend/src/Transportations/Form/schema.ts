import { z } from "zod";

export const transportationSchema = z
	.object({
		name: z
			.string({ message: "name is required" })
			.min(1, { message: "name must be at least 1 character long" }),

		type: z
			.string({ message: "type is required" })
			.refine(
				(val) => ["Bus", "Car", "Train", "Plane", "Boat"].includes(val),
				{
					message:
						"type must be one of: Bus, Car, Train, Plane, Boat",
				},
			),
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
		pickUpLocation: z
			.string({ message: "pickUpLocation is required" })
			.min(1, {
				message: "pickUpLocation must be at least 1 character long",
			}),

		dropOffLocation: z
			.string({ message: "dropOffLocation is required" })
			.min(1, {
				message: "dropOffLocation must be at least 1 character long",
			}),
		pickUpTime: z.string().min(1, "End Date is required"),

		dropOffTime: z.string().min(1, "End Date is required"),
	})
	.refine((data) => data.dropOffTime > data.pickUpTime, {
		path: ["pickUpTime", "dropOffTime"],
		message: "dropOffTime must be after pickUpTime",
	});
