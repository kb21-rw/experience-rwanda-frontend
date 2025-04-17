import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name is required")
      .max(20, "Full name should not exceed 20 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
