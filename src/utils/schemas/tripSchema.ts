import { z } from "zod";
// I am receiving string instead of number
export const pricingOptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.string().min(1, "Amount must be positive"),
  description: z.string().optional(),
});

export const tripSchema = z.object({
  title: z.string().min(1, "Title is required"),
  destination: z.string().min(1, "Destination is required"),
  description: z.string().min(1, "Description is required"),
  departureTime: z.string().min(1, "Departure time is required"),
  returnTime: z.string().min(1, "Return time is required"),
  seats: z.string().min(1, "Seats is required"),
  pricingOptions: z
    .array(pricingOptionSchema)
    .min(1, "At least one pricing option is required"),
});
