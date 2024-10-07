import { z } from "zod";

export const formSchema = z
	.object({
		name: z.string().min(1, "Name is required"),
		description: z.string().min(1, "Description is required"),
		location: z.string().min(1, "Location is required"),
		ticketPrices: z.object({
			foreigner: z.number().min(0, "Price must be positive"),
			native: z.number().min(0, "Price must be positive"),
			student: z.number().min(0, "Price must be positive"),
		}),
		openingHours: z.object({
			sunday: z.object({
				open: z.string().optional(),
				close: z.string().optional(),
				dayOff: z.boolean(),
			}),
			monday: z.object({
				open: z.string().optional(),
				close: z.string().optional(),
				dayOff: z.boolean(),
			}),
			tuesday: z.object({
				open: z.string().optional(),
				close: z.string().optional(),
				dayOff: z.boolean(),
			}),
			wednesday: z.object({
				open: z.string().optional(),
				close: z.string().optional(),
				dayOff: z.boolean(),
			}),
			thursday: z.object({
				open: z.string().optional(),
				close: z.string().optional(),
				dayOff: z.boolean(),
			}),
			friday: z.object({
				open: z.string().optional(),
				close: z.string().optional(),
				dayOff: z.boolean(),
			}),
			saturday: z.object({
				open: z.string().optional(),
				close: z.string().optional(),
				dayOff: z.boolean(),
			}),
		}),
		tags: z.array(z.string().min(1, "Tag is required")),
	})
	.superRefine((data, ctx) => {
		// Iterate over each day of the week
		Object.entries(data.openingHours).forEach(([day, schedule]) => {
			const { open, close, dayOff } = schedule as {
				open?: string;
				close?: string;
				dayOff: boolean;
			};

			if (!dayOff) {
				// Check if open and close times are provided
				if (!open || !close) {
					ctx.addIssue({
						path: ["openingHours", day],
						code: z.ZodIssueCode.custom,
						message:
							"Open and close times are required when the day is not a day off.",
					});
				}

				// Check if open time is before close time
				if (open && close && open >= close) {
					ctx.addIssue({
						path: ["openingHours", day],
						code: z.ZodIssueCode.custom,
						message: "Open time must be before close time.",
					});
				}
			}
		});
	});
