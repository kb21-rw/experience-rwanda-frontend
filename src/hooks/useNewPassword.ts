"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/utils/schemas/newPasswordSchema";
import { toast } from "react-toastify";
import { useEffect } from "react";

type FormData = z.infer<typeof resetPasswordSchema>;

export const useNewPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      toast.error(
        "Unauthorized access. Please use the reset link from your email."
      );
      router.replace("/reset-password");
    }
  }, [email, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: data.newPassword }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to reset password");
      }

      toast.success("Password reset successful!");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An error occurred, please try again later.";
      setError("root", { message });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
};
