import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { RawBooking } from "@/types/Booking";

export const useBookings = (tripId: string) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/bookings/trip/${tripId}`;
  const {
    data: bookings,
    error,
    isLoading,
  } = useSWR<RawBooking[]>(apiUrl, fetcher);
  return {
    bookings: bookings || [],
    isLoading,
    error: error ? error.message : null,
  };
};
