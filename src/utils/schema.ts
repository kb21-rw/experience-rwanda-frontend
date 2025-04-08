import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name must be 30 characters or less." }),

  email: z.string().email({ message: "Please enter a valid email address." }),

  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters." })
    .max(150, { message: "Message must be 150 characters or less." }),
});
