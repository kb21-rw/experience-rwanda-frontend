"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { z } from "zod";
import { loginSchema } from "@/utils/schemas/loginSchema";
import { EmailInput } from "../login/components/EmailInput";
import { PasswordInput } from "../login/components/PasswordInput";
import { RememberMe } from "../login/components/RememberMe";
import { toast } from "react-toastify";

type FormData = z.infer<typeof loginSchema>;

interface ApiResponse<T> {
  data?: T;
  message?: string;
  errors?: Record<string, string>;
}

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError: setFormError,
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const email = watch("email");

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
              rememberMe: data.rememberMe,
            }),
            credentials: "include",
          }
        );

        const result = (await res.json()) as ApiResponse<{
          access_token: string;
        }>;

        if (!res.ok) {
          if (result.message) {
            toast.error(result.message);
          } else if (result.errors) {
            Object.entries(result.errors).forEach(([field, message]) => {
              setFormError(field as keyof FormData, {
                type: "manual",
                message: message as string,
              });
            });
          } else {
            toast.error("Invalid email or password");
          }
          return;
        }

        if (!result.data?.access_token) {
          toast.error("Invalid response from server");
          return;
        }

        if (data.rememberMe) {
          localStorage.setItem("token", result.data.access_token);
        } else {
          sessionStorage.setItem("token", result.data.access_token);
        }

        toast.success("Login successful!");
        router.push("/admin");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        toast.error(message);
      }
    },
    [router, setFormError]
  );

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first");
      return;
    }
    router.push("/password-reset");
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-xl font-medium">
          Welcome to <span className="font-bold">ExperienceRw</span> Admin
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <EmailInput register={register} errors={errors} />
        <PasswordInput
          register={register}
          errors={errors}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <div className="flex items-center justify-between">
          <RememberMe register={register} />
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={isSubmitting}
            className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Forgot Password?"}
          </button>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white hover:bg-gray-800 rounded-md"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
