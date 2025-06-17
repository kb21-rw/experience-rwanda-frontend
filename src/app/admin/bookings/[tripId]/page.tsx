import BookingList from "./BookingList";
import { Booking } from "@/types/Booking";

const Bookings = async ({ params }: { params: { tripId: string } }) => {
  let bookings: Booking[] = [];
  let errorMessage: string = "";
  let isLoading = true;
  try {
    const bookingsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/trip/${params.tripId}`,
      {
        next: {
          tags: ["bookings"],
        },
      }
    );
    bookings = await bookingsRes.json();
  } catch (error) {
    console.error("Error fetching bookings:", error);
    bookings = [];
    errorMessage = "Failed to fetch bookings";
  } finally {
    isLoading = false;
  }
  return (
    <BookingList
      bookings={bookings}
      isLoading={isLoading}
      error={errorMessage}
    />
  );
};

export default Bookings;
