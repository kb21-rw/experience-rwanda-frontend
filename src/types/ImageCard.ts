export type Card = {
  id: string;
  title: string;
  description?: string;
  trip: string;
  departureTime: string;
  price: number | string;
  seats: number;
  seatsBooked?: number;
  currency?: string;
  mainPicture: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Row = {
  id: number;
  title: string;
  description: string;
};
