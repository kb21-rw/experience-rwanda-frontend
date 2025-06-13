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
  status: TripStatus;
};

export type TripStatus = "ONGOING" | "PAST" | "AVAILABLE" | "CANCELLED";

export type Row = {
  id: string;
  title: string;
  description: string;
};
