"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { adminInviteSchema } from "@/utils/schemas/adminInviteSchema";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

type FormData = z.infer<typeof adminInviteSchema>;

const InviteAdminPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(adminInviteSchema),
  });

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Token not found. Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/invite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: data.email }),
        }
      );

      if (!response.ok) {
        const respData = await response.json().catch(() => null);
        const errorMessage =
          respData?.message || "Failed to send invite. Please try again.";
        toast.error(errorMessage);
        return;
      }

      toast.success("Invitation sent successfully!");
      reset();
    } catch (error) {
      toast.error(
        (error as Error)?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center font-inter">
      <h1 className="font-bold text-2xl text-center mb-10">Invite New User</h1>
      <div className="px-11 py-21.25 max-w-md mx-auto shadow-md rounded-lg">
        <p className="mb-20 text-lg">
          Invite a new user, will have an admin role after accepting invitation
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Enter email address"
            {...register("email")}
            disabled={isSubmitting}
            error={errors.email?.message}
          />
          <Button
            variant="primary"
            className="mt-5 w-full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Invite"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InviteAdminPage;
