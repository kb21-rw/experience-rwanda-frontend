import { z } from "zod";

export const searchSchema = z.object({
  location: z.string().max(50, "Location must not exceed 50 characters"),

  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional()
    .refine((data) => !data?.from || !data?.to || data.from <= data.to, {
      message: "End date must be after start date.",
      path: ["to"],
    }),

  price: z
    .object({
      min: z.string().optional(),
      max: z.string().optional(),
    })

    .refine(
      (data) => {
        if (data.min !== "" && data.max !== "") {
          return Number(data.min) < Number(data.max);
        }
        return true;
      },
      { message: "Min price must be less than max price", path: ["min"] }
    ),
});

export type SearchFormData = z.infer<typeof searchSchema>;
