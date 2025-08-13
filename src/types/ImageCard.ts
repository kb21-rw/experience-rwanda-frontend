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
  trip: string;
  departureTime: string;
  price: number;
  seats: number;
  seatsBooked: number;
  currency?: string;
  mainPicture: string;
  createdAt?: string;
  updatedAt?: string;
  pricingOptions?: PricingOption[];
};

export type Row = {
  id: number;
  title: string;
  description: string;
};
