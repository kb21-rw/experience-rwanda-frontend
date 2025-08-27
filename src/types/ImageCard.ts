import { Booking } from "./Booking";

export type PricingOption = {
  id: string;
  name: string;
  amount: number;
  description: string;
};

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
  bookings: Booking[];
  status:
    | "fully-booked"
    | "completed"
    | "canceled"
    | "ongoing"
    | "canceled"
    | "available";
  onDelete?: (id: string) => void;
};

export type TripStatus = "ONGOING" | "PAST" | "AVAILABLE" | "CANCELLED";

export type Row = {
  id: string;
  title: string;
  description: string;
};

export type InfoCard = {
  id: string;
  title: string;
  description: string;
  image: string;
};
