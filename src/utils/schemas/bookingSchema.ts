import { z } from "zod";

export const UserInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  pricingId: z.string().min(1, "Pricing option is required"),
});
