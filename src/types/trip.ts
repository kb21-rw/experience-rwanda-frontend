export interface Trip {
  title: string;
  description: string;
  destination: string;
  departureTime: Date;
  returnTime: Date;
  totalSeats: number;
  totalBookedSeats?: number;
  pricingOptions: PricingOption[];
}

export interface PricingOption {
  id: string;
  amount: string;
  name: string;
  description?: string;
}

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
