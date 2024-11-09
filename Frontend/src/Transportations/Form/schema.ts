import { z } from "zod";

export const transportationSchema = z
  .object({
    name: z
      .string({ message: "name is required" })
      .min(1, { message: "name must be at least 1 character long" }),

    type: z
      .string({ message: "type is required" })
      .refine((val) => ["Bus", "Car", "Train", "Plane", "Boat"].includes(val), {
        message: "type must be one of: Bus, Car, Train, Plane, Boat",
      }),

    price: z
      .number({ message: "price is required" })
      .min(0, { message: "price must be at least 0" }),

    availability: z
      .number({ message: "availability is required" })
      .min(0, { message: "availability must be at least 0" }),

    pickUpLocation: z
      .string({ message: "pickUpLocation is required" })
      .min(1, { message: "pickUpLocation must be at least 1 character long" }),

    dropOffLocation: z
      .string({ message: "dropOffLocation is required" })
      .min(1, { message: "dropOffLocation must be at least 1 character long" }),

    pickUpTime: z
      .date({ message: "pickUpTime is required" })
      .refine((val) => !isNaN(val.getTime()), {
        message: "pickUpTime must be a valid date",
      }),

    dropOffTime: z
      .date({ message: "dropOffTime is required" })
      .refine((val) => !isNaN(val.getTime()), {
        message: "dropOffTime must be a valid date",
      }),

    timeTakenInMins: z
      .number({ message: "timeTakenInMins is required" })
      .min(0, { message: "timeTakenInMins must be at least 0" }),

    numberOfBookings: z
      .number({ message: "numberOfBookings cannot be negative" })
      .min(0, { message: "numberOfBookings cannot be negative" })
      .optional()
      .default(0),

    tourists: z.array(z.string())
    .optional()
    .default([]),

    createdBy: z.string().min(1, { message: "createdBy is required" })
    .optional(),

  })
  .refine((data) => data.dropOffTime > data.pickUpTime, {
    path: ["pickUpTime", "dropOffTime"],
    message: "dropOffTime must be after pickUpTime",
  });
