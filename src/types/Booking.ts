export type RawBooking = {
  id: string;
  user: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  trip: {
    totalBookedSeats: number;
    pricingOptions: {
      amount: number;
    }[];
  };
};
