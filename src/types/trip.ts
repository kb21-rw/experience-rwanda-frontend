export interface Trip {
  title: string;
  description: string;
  destination: string;
  departureTime: Date;
  returnTime: Date;
  seats: number;
  pricingOptions: PricingOptions[];
}

export interface PricingOptions {
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
