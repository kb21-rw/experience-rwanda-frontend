export type RawBooking = {
  id: string;
  user: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  trip: {
    seatsBooked: number;
    pricingOptions: {
      amount: number;
    }[];
  };
};
