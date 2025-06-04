import { z } from "zod";

export const verifyOtpSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  code: z
    .string()
    .length(6, { message: "Code must be exactly 6 digits" })
    .regex(/^\d{6}$/, { message: "Code must contain only digits" }),
});
