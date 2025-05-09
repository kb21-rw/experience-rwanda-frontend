"use client";
import { useState, useCallback, useEffect } from 'react';
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
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';

    if (rememberMe && savedEmail && savedPassword) {
      setValue('email', savedEmail);
      setValue('password', savedPassword);
      setValue('rememberMe', true);
    }
  }, [setValue]);

  const onSubmit = useCallback(
    async (data: FormData) => {
      setError(null);

      try {
      
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
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

        if (!res.ok || !result.access_token) {
          setError(result.message || 'Invalid email or password');
          return;
        }
        

        localStorage.setItem('token', result.access_token);
        console.log(result.token)
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

<div className="space-y-2 relative">
  <Label htmlFor="password" className="text-gray-900">
    Password
  </Label>
  <div className="relative">
    <Input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="••••••••••••"
      {...register("password")}
      className="w-full rounded-md pr-10"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2"
    >
      {showPassword ? (
      
             <svg
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             strokeWidth={1.5}
             stroke="currentColor"
             className="w-4 h-4"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
             />
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
             />
           </svg>
      ) : (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
        />
      </svg>
   
      )}
    </button>
  </div>
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