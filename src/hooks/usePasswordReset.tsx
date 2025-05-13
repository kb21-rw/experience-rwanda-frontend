"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordResetSchema } from "@/utils/schemas/passwordResetSchema";
import { toast } from "react-toastify";

type FormData = z.infer<typeof passwordResetSchema>;

export const usePasswordReset = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/request-password-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email }),
        }
      );

      const result = await res.json();
      if (!res.ok) {
        const errorMessage =
          res.status === 404
            ? "Email not found. Please check and try again."
            : result?.message || "Failed to send OTP.";

        const errorField = res.status === 404 ? "email" : "root";

        setError(errorField, { message: errorMessage });
        return;
      }

      toast.success("Reset code sent! Check your email.");
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError("root", { message });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    reset,
  };
};
