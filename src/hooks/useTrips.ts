import { useEffect, useState } from "react";
import { Trip } from "@/types/ImageCard";
import { getData } from "@/utils/request";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/trips`;

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const result = await getData(apiUrl);
        setTrips(result);
      } catch {
        setError("Failed to load trips");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return { trips, setTrips, loading, error };
};
