import { Trip } from "./trip";
import { User } from "./User";

export type Booking = {
  id: string;
  tripPricingId: string;
  bookedSeats: number;
  totalAmount: number;
  paymentStatus: "Paid" | "Unpaid" | "Pending";
  createdAt: string;
  updatedAt: string;
  user: User;
  trip: Trip;
};
