"use client";
import React from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { passwordResetSchema } from "@/utils/schemas/passwordResetSchema";

type FormData = z.infer<typeof passwordResetSchema>;

const PasswordResetForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
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
        if (res.status === 404) {
          setError("root", {
            message: "Email not found. Please check and try again.",
          });
        } else {
          setError("root", {
            message: result?.message || "Failed to send OTP.",
          });
        }
        return;
      }

      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError("root", { message });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md"
      >
        <div className="flex gap-5">
          <Link href="/login" className="text-3xl font-bold mb-2">
            ←
          </Link>
          <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        </div>
        <p className="text-lg py-8">
          Enter the email address you used while creating your Experience Rwanda
          account. We will send a code to reset your password.
        </p>

        {errors.root && (
          <p className="text-red-600 text-center mb-4 text-sm font-medium">
            {errors.root.message}
          </p>
        )}

        <div className="mb-7">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <Button
          variant="primary"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
