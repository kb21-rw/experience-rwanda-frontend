"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { resetPasswordSchema } from "@/utils/schemas/newPasswordSchema";

type FormData = z.infer<typeof resetPasswordSchema>;

const NewPasswordForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: data.newPassword }),
      });

      const result = await res.json();

      if (!res.ok)
        throw new Error(result.message || "Failed to reset password");

      router.push("/login");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An error accured, please try again later.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md"
    >
      <div className="flex gap-5 mb-6">
        <Link href="/login" className="text-3xl font-bold">
          ←
        </Link>
        <h2 className="text-2xl font-bold">Enter New Password</h2>
      </div>

      {error && (
        <p className="text-red-600 text-center text-sm mb-4">{error}</p>
      )}

      <div className="mb-4">
        <Label>New Password</Label>
        <Input type="password" {...register("newPassword")} />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <Label>Confirm New Password</Label>
        <Input type="password" {...register("confirmNewPassword")} />
        {errors.confirmNewPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmNewPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
};

export default NewPasswordForm;
