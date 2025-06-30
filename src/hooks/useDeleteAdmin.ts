import { useState } from "react";

export const useDeleteAdmin = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAdmin = async (adminId: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/${adminId}`,
        {
          method: "DELETE",
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
