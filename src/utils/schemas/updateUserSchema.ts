import { z } from "zod";

export const updateUserSchema = z
  .object({
    email: z.string().email("Invalid email address").optional(),
    fullName: z.string().min(1, "Full name is required").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) =>
      (!data.password && !data.confirmPassword) ||
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );
