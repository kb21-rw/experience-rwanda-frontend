import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name must be 30 characters or less." }),

  email: z.string().email({ message: "Please enter a valid email address." }),

  phone: z.string().min(10, { message: "Please enter a valid phone number." }),

  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." })
    .max(50, { message: "Subject must be 50 characters or less." }),

  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters." })
    .max(150, { message: "Message must be 150 characters or less." }),
});
