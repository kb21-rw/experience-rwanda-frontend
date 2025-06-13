import { Admin } from "./Admin";
import { Trip } from "./ImageCard";

export type Booking = {
  id: string;
  tripPricingId: string;
  bookedSeats: number;
  totalAmount: number;
  paymentStatus: "Paid" | "Unpaid" | "Pending";
  createdAt: string;
  updatedAt: string;
  user: Admin;
  trip: Trip;
};
