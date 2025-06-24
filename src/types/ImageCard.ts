import { PricingOption } from "./trip";

export type Trip = {
  id: string;
  title: string;
  description?: string;
  destination: string;
  departureTime: string;
  returnTime: string;
  pricingOptions: PricingOption[];
  totalBookedSeats: number;
  totalSeats: number;
  currency: string;
  coverImage: string;
  priceTitle: string;
  priceDescription: string;
  status: "fully-booked" | "completed" | "canceled" | "ongoing" | "canceled";
  onDelete?: (id: string) => void;
};

export type TripStatus = "ONGOING" | "PAST" | "AVAILABLE" | "CANCELLED";

export type Row = {
  id: string;
  title: string;
  description: string;
};