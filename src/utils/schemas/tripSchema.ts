import { z } from "zod";

export const pricingOptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.string().min(1, "Amount must be positive"),
  description: z.string().optional(),
});

export const tripSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    destination: z.string().min(1, "Destination is required"),
    description: z.string().min(1, "Description is required"),
    departureDate: z.date().or(z.string()),
    departureTime: z.string().optional(),
    returnDate: z.date().or(z.string()),
    returnTime: z.string().optional(),
    totalSeats: z.string().min(1, "Seats is required"),
    coverImage: z.string().optional(),
    galleryImages: z
      .array(
        z.object({
          url: z.string(),
          deleted: z.boolean().optional(),
          id: z.string().optional(),
          tripId: z.string().optional(),
        })
      )
      .optional(),
    pricingOptions: z
      .array(pricingOptionSchema)
      .min(1, "At least one pricing option is required"),
  })
  .refine((data) => {
    const departureDate = new Date(data.departureDate);
    const returnDate = new Date(data.returnDate);
    
    if (returnDate > departureDate) return true;
    if (returnDate.getTime() === departureDate.getTime()) {
      if (!data.departureTime || !data.returnTime) return true;
      
      const departureTime = data.departureTime;
      const returnTime = data.returnTime;
      
      return returnTime > departureTime;
    }
    
    return false;
  }, {
    message: "Return date/time must be after departure date/time",
    path: ["returnDate"],
  });
