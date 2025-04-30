"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signupSchema } from "@/utils/schemas/signupSchema";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

type FormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true);
      setFormError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/signup`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
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
    [router]
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
