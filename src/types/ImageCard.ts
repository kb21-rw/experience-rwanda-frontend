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
  coverImage: string;
};

export type Row = {
  id: string;
  title: string;
  description: string;
};

export type Trip = {
  id: string;
  displayId: string;
  title: string;
  departureTime: string;
  destination: string;
  seatsBooked: number;
  seats: number;
  status: "fully-booked" | "completed" | "canceled" | "ONGOING" | "CANCELLED" | "PAST";
  onDelete?: (id: string) => void;
};
