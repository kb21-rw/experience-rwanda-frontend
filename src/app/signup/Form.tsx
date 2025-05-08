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

  const { verifiedEmail, isAuthorized, verifying } = useMemo(() => {
    if (!token)
      return { verifiedEmail: null, isAuthorized: false, verifying: false };
    try {
      const decoded = jwtDecode<{ email: string }>(token);
      if (!decoded.email) throw new Error();
      return {
        verifiedEmail: decoded.email,
        isAuthorized: true,
        verifying: false,
      };
    } catch {
      return { verifiedEmail: null, isAuthorized: false, verifying: false };
    }
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: verifiedEmail || "",
    },
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/create-profile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: data.name,
              email: verifiedEmail,
              password: data.password,
            }),
          }
        );

        const result = await res.json();

        if (!res.ok) {
          setError("root", { message: result?.message || "Signup failed" });
          setLoading(false);
          return;
        }

        router.push("/login");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError("root", { message });
        console.error("Signup error:", message);
      } finally {
        setLoading(false);
      }
    },
    [router, verifiedEmail, token, setError]
  );

  if (verifying)
    return <p className="text-center py-10">Verifying invitation...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md"
    >
      <h1 className="text-xl font-bold text-center">ExperienceRw</h1>
      <h2 className="text-lg text-center mb-6 font-medium">Sign Up</h2>

      {!isAuthorized && (
        <p className="text-red-600 text-center mb-6 text-sm font-medium">
          You are not authorized create an account.
        </p>
      )}
      {errors.root && (
        <p className="text-red-600 text-center mb-4 text-sm font-medium">
          {errors.root.message}
        </p>
      )}

      <div className="mb-4">
        <Label>Full Names</Label>
        <Input
          type="text"
          placeholder="Enter your full names"
          disabled={!isAuthorized}
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
          value={verifiedEmail ?? ""}
          disabled
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Label>Password</Label>
        <Input
          type="password"
          disabled={!isAuthorized}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label>Confirm Password</Label>
        <Input
          type="password"
          disabled={!isAuthorized}
          {...register("confirmPassword")}
        />
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
        disabled={loading || isSubmitting || !isAuthorized}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default SignupForm;
