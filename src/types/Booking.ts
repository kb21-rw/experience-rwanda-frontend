export type RawBooking = {
  id: string;
  user: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  trip: {
    totalBookedSeats: number;
    title?: string;
    description?: string;
    destination?: string;
departureTime?: string;
totalSeats?: number;
    pricingOptions: {
      amount: number;
    }[];
  
  };
};
