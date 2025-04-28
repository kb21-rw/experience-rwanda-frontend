"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordResetSchema } from "@/utils/schemas/passwordResetSchema";

type FormData = z.infer<typeof passwordResetSchema>;

const PasswordReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      document.querySelector("form")?.reset();
    } catch (error) {
      console.error("Password reset error:", error);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('/uploads/hand.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md"
      >
        <h1 className="text-xl font-bold text-center">Reset Password</h1>
        <p className="text-lg py-10 text-center">
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
          Reset Password
        </Button>
      </form>
    </main>
  );
};

export default PasswordReset;
