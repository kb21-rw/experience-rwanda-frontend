import { useEffect, useState } from "react";
import { Trip } from "@/types/ImageCard";
import { getData } from "@/utils/request";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admins`;

export const useAdmins= () => {
  const [admins, setAdmins] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const result = await getData(apiUrl);
        setAdmins(result);
      } catch {
        setError("Failed to load admins");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  console.log("AAAAAAAAAAAAAdmins",admins)

  return { admins, setAdmins, loading, error };
};
