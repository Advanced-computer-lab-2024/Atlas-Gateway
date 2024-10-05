import { z } from "zod";

export const formSchema = z
	.object({
		name: z.string().min(1, "Name is required"),
		description: z.string().min(1, "Description is required"),
		ticketF: z.number().positive("Price for foreigners is required"),
		ticketN: z.number().positive("Price for natives is required"),
		ticketS: z.number().positive("Price for students is required"),
		days: z
			.array(z.enum(["sat", "sun", "mon", "tue", "wed", "thu", "fri"]))
			.min(1, "At least one working day is required"),
		openSat: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
			message: "Invalid time format",
		}),
		closeSat: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
			message: "Invalid time format",
		}),
		openSun: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
			message: "Invalid time format",
		}),
		closeSun: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
			message: "Invalid time format",
		}),
		openMon: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
			message: "Invalid time format",
		}),
		closeMon: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
			message: "Invalid time format",
		}),
		openTue: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
			message: "Invalid time format",
		}),
		closeTue: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
			message: "Invalid time format",
		}),
		openWed: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
			message: "Invalid time format",
		}),
		closeWed: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
			message: "Invalid time format",
		}),
		openThu: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
			message: "Invalid time format",
		}),
		closeThu: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
			message: "Invalid time format",
		}),
		openFri: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
			message: "Invalid time format",
		}),
		closeFri: z.string().refine((value) => /^\d{2}:\d{2}$/.test(value), {
			message: "Invalid time format",
		}),
	})
	.refine(
		(data) => timeToMinutes(data.openSat) <= timeToMinutes(data.closeSat),
		{
			message: "Opening hour must be less than closing hour",
			path: ["openSat"],
		},
	)
	.refine(
		(data) => timeToMinutes(data.openSun) <= timeToMinutes(data.closeSun),
		{
			message: "Opening hour must be less than closing hour",
			path: ["openSun"],
		},
	)
	.refine(
		(data) => timeToMinutes(data.openMon) <= timeToMinutes(data.closeMon),
		{
			message: "Opening hour must be less than closing hour",
			path: ["openMon"],
		},
	)
	.refine(
		(data) => timeToMinutes(data.openTue) <= timeToMinutes(data.closeTue),
		{
			message: "Opening hour must be less than closing hour",
			path: ["openTue"],
		},
	)
	.refine(
		(data) => timeToMinutes(data.openWed) <= timeToMinutes(data.closeWed),
		{
			message: "Opening hour must be less than closing hour",
			path: ["openWed"],
		},
	)
	.refine(
		(data) => timeToMinutes(data.openThu) <= timeToMinutes(data.closeThu),
		{
			message: "Opening hour must be less than closing hour",
			path: ["openThu"],
		},
	)
	.refine(
		(data) => timeToMinutes(data.openFri) <= timeToMinutes(data.closeFri),
		{
			message: "Opening hour must be less than closing hour",
			path: ["openFri"],
		},
	);

const timeToMinutes = (time: string) => {
	const [hours, minutes] = time.split(":").map(Number);
	return hours * 60 + minutes;
};
