import { fetcher } from "@/lib/fetcher";
import { Trip } from "@/types/ImageCard";
import useSWR from "swr";

export const useTrips = () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/trips`;
  const { data: trips, error, isLoading: loading, mutate } = useSWR<Trip[]>(apiUrl, fetcher);

  const handleDelete = async (tripId: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips/${tripId}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  return { trips, loading, error, handleDelete };
};