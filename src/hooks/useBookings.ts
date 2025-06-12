import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { RawBooking } from "@/types/Booking";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/bookings`;

export const useBookings = () => {
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
