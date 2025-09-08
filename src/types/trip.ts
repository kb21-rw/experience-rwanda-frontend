import { Booking } from "./Booking";


export interface Trip {
  id:string
  title: string;
  description: string;
  destination: string;
  departureTime: Date;
  returnTime: Date;
  totalSeats: number;
  totalBookedSeats?: number;
  pricingOptions: PricingOption[];
  fromLocation: TripsLocation;
  toLocation:TripsLocation,
  coverImage: string;
  currency: string;
  tripDescription: string;
  tripPackages: TripPackageType[];
  priceTitle:string
  bookings: Booking[]
  priceDescription:string
  status:boolean

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

export interface TripsLocation{
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}
