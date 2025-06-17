import { useState } from "react";

export const useDeleteTrip = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTrip = async (tripId: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/trips/${tripId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete trip.");
      }
      await fetch("/api/revalidate/trips", {
        method: "POST",
      });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteTrip, isDeleting, error };
};
