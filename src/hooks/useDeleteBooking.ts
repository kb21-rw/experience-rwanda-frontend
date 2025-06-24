import { useState } from "react";

export const useDeleteBooking = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBooking = async (bookingId: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete booking.");
      }
      await fetch("/api/revalidate/bookings", {
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

  return { deleteBooking, isDeleting, error };
};
