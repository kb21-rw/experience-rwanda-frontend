export type TripDetails = {
  id: string;
  title: string;
  description?: string;
  trip: string;
  destination: string;
  departureTime: string;
  price: number;
  seats: number;
  seatsBooked?: number;
  currency?: string;
  mainPicture: string;
};

export type Row = {
  id: number;
  title: string;
  description: string;
};
