import { z } from "zod";

export const EditBookingSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),
});

export type EditBookingSchemaType = z.infer<typeof EditBookingSchema>;
