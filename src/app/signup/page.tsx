"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/utils/schemas/signupSchema";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type FormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/signup`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );

        const result = await res.json();

        if (!res.ok || result?.data?.status !== "success") {
          throw new Error(result?.message || "Signup failed");
        }

        router.push("/login");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unexpected error";
        console.error("Signup error:", message);
      }
    },
    [router]
  );

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('/uploads/hand.png')`,
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md"
      >
        <h1 className="text-xl font-bold text-center">ExperienceRw</h1>
        <h2 className="text-lg text-center mb-6 font-medium">Sign Up</h2>

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
            placeholder="enter your email"
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
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
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

        <Button variant="primary" type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </main>
  );
};

export default Signup;
