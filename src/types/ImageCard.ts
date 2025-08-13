export type PricingOption = {
  id: string;
  name: string;
  amount: number;
  description: string;
};

export type Card = {
  id: string;
  title: string;
  description?: string;
  destination: string;
  departureTime: string;
  price: number;
  seats: number;
  seatsBooked: number;
  currency?: string;
  mainPicture: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TripStatus = "ONGOING" | "PAST" | "AVAILABLE" | "CANCELLED";

export type Row = {
  id: string;
  title: string;
  description: string;
};
