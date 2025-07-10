import { z } from "zod";

export const updateUserSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    fullName: z.string().min(1, { message: "Full name is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .optional(),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });
