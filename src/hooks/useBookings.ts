import { getData } from "@/utils/request";
import { Booking } from "@/types/Booking";
import { useState, useEffect } from "react";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/bookings`;

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchbookings = async () => {
      try {
        const result = await getData(apiUrl);
        setBookings(result);
      } catch {
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchbookings();
  }, []);

  return { bookings, setBookings, loading, error };
};
