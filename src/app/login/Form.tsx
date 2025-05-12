"use client";
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { z } from 'zod';
import { loginSchema } from '@/utils/schemas/loginSchema';
import { EmailInput } from '../login/components/EmailInput';
import { PasswordInput } from '../login/components/PasswordInput';
import { RememberMe } from '../login/components/RememberMe';
import ResetPopup from '../login/components/resetPopup';

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const email = watch('email');

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

        if (data.rememberMe) {
          localStorage.setItem('token', result.access_token);
        } else {
          sessionStorage.setItem('token', result.access_token);
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

  const handleForgotPassword = () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }
    setResetEmail(email);
    setShowResetPopup(true);
  };

  return (
    <div>
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
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white hover:bg-gray-800 rounded-md"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      {showResetPopup && (
        <ResetPopup
          onClose={() => setShowResetPopup(false)}
          email={resetEmail}
        />
      )}
    </div>
  );
}