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

export interface TripPackageType {
  id: number;
  selectedOptions: string[];
  customOptions: string[];
  newOption: string;
}

export enum TripStatus {
  AVAILABLE = "available",
  FULLY_BOOKED = "fully-booked", // or 'sold_out'
  CANCELED = "canceled",
  COMPLETED = "completed",
  ONGOING = "ongoing",
  NO_ENOUGH_SEATS = "no-enough-seats",
}

export interface CheckSeatsResponse {
  status: TripStatus;
  success: boolean;
  message: string;
}

export interface TripsLocation {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}
