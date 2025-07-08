"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { adminInviteSchema } from "@/utils/schemas/adminInviteSchema";
import { useState } from "react";
import { toast } from "react-toastify";

const InviteAdminPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = adminInviteSchema.safeParse({ email });
    if (!validation.success) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Token not found. Please login again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/invite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const errorMessage =
          data?.message || "Failed to send invite. Please try again.";
        toast.error(errorMessage);
        return;
      }

      toast.success("Invitation sent successfully!");
      setEmail("");
    } catch (error) {
      toast.error(
        (error as Error)?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center font-inter">
      <h1 className="font-bold text-2xl text-center mb-10">Invite New User</h1>
      <div className="px-11 py-21.25 max-w-md mx-auto shadow-md rounded-lg">
        <p className="mb-20 text-lg">
          Invite a new user, will have an admin role after accepting invitation
        </p>
        <form onSubmit={handleSendInvite}>
          <Input
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <Button
            variant="primary"
            className="mt-5 w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Invite"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InviteAdminPage;
