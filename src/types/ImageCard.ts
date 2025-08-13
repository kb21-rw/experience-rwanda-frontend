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
  price: number;
  totalBookedSeats: number;
  totalSeats: number;
  currency: string;
  coverImage: string;
  createdAt?: string;
  updatedAt?: string;
  pricingOptions: PricingOption[];
};

export type TripStatus = "ONGOING" | "PAST" | "AVAILABLE" | "CANCELLED";

export type Row = {
  id: string;
  title: string;
  description: string;
};
