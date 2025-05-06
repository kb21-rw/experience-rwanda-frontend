"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signupSchema } from "@/utils/schemas/signupSchema";
import { z } from "zod";
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

type FormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const invitedEmail = useMemo(() => {
    if (!token) return null;
    try {
      const decoded = jwtDecode<{ email: string }>(token);
      return decoded.email;
    } catch {
      return null;
    }
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: invitedEmail || "",
    },
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true);
      setFormError(null);
      if (!token || !invitedEmail) {
        setFormError("Invalid or missing invite token.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/signup`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.name,
              email: invitedEmail,
              password: data.password,
            }),
          }
        );

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result?.message || "Signup failed");
        }

        router.push("/login");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setFormError(message);
        console.error("Signup error:", message);
      } finally {
        setLoading(false);
      }
    },
    [router, invitedEmail, token]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md"
    >
      <h1 className="text-xl font-bold text-center">ExperienceRw</h1>
      <h2 className="text-lg text-center mb-6 font-medium">Sign Up</h2>

      {formError && (
        <p className="text-red-600 text-center mb-4 text-sm font-medium">
          {formError}
        </p>
      )}

      <div className="mb-4">
        <Label>Full Names</Label>
        <Input
          type="text"
          placeholder="Enter your full names"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Enter your email"
          readOnly
          value={invitedEmail ?? ""}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Label>Password</Label>
        <Input type="password" {...register("password")} />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label>Confirm Password</Label>
        <Input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default SignupForm;
