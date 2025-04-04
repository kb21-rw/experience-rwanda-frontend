import { z } from "zod";

export const searchSchema = z.object({
  location: z.string().max(50, "Location must not exceed 50 characters"),

  date: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .refine(
      (data) => {
        if (data.from && data.to) {
          return data.from < data.to;
        }
        return true; // Allow if either date is missing
      },
      { message: "Start date must be before end date", path: ["from"] }
    ),

  price: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .refine(
      (data) => {
        if (data.min !== undefined && data.max !== undefined) {
          return data.min < data.max;
        }
        return true; // Allow if either min or max is missing
      },
      { message: "Min price must be less than max price", path: ["min"] }
    ),
});

export type SearchFormData = z.infer<typeof searchSchema>;
