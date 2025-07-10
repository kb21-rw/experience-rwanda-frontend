import { useState } from "react";
import { useAuth } from "@/context/authContext";

export const useDeleteAdmin = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const deleteAdmin = async (adminId: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/${adminId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete admin.");
      }
      await fetch("/api/revalidate/admins", {
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

  return { deleteAdmin, isDeleting, error };
};
