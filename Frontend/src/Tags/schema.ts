import { z } from "zod";

// Define the schema for the AddTags form
export const tagSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Tag name is required" }) 
    .max(50, { message: "Tag name should not exceed 50 characters" }), 
  category: z
    .string()
    .min(1, { message: "Type is required" }) 
    .max(50, { message: "Type should not exceed 50 characters" }), 
});

// Infer the type to be used in the form
export type TagFormType = z.infer<typeof tagSchema>;
