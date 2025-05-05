"use client";
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { z } from 'zod';
import { loginSchema } from '@/utils/schemas/loginSchema';

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
              rememberMe: data.rememberMe,
            }),
          }
        );

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result?.message || "Login failed");
        }

  
        router.push("/admin");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        setError(message);
        console.error("Login error:", message);
      }
    },
    [router]
  );

  return (
    <div className="">
      <div className="text-center mb-8">
        <h1 className="text-xl font-medium">
          Welcome to <span className="font-bold">ExperienceRw</span> Admin
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-900">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="experiencerwanda@gmail.com"
            {...register("email")}
            className="w-full rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-md mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-900">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••••••"
            {...register("password")}
            className="w-full rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              {...register("rememberMe")}
              className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
            />
            <Label htmlFor="rememberMe" className="ml-2 text-gray-900">
              Remember Me
            </Label>
          </div>
          <div>
            <a href="#" className="text-black hover:text-gray-700">
              Forget password?
            </a>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white hover:bg-gray-800 rounded-md"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
} 