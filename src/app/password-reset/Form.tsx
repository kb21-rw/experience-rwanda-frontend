"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordResetSchema } from "@/utils/schemas/passwordResetSchema";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof passwordResetSchema>;

const PasswordResetForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      router.push("/login");
      document.querySelector("form")?.reset();
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setLoading(false);
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
          Enter the email address you used when creating your Experience Rwanda
          account. We will send a code to reset your password.
        </p>

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

        <Button variant="primary" type="submit" className="w-full">
          {loading ? "Sending..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
