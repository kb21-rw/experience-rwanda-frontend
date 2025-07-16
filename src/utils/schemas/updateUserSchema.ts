import { z } from "zod";

export const updateUserSchema = z
  .object({
    email: z.string().email("Invalid email address").optional(),
    name: z.string().min(1, "Name is required").optional(),
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: "Password must be at least 6 characters",
      }),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );
