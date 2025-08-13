import { z } from "zod";

export const adminInviteSchema = z.object({
  email: z.string().email(),
});
