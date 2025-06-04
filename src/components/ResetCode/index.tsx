"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { OTPInput } from "./OTPInput";
import { usePasswordReset } from "@/hooks/usePasswordReset";
import { verifyOtpSchema } from "@/utils/schemas/resetCodeSchema";
import { Button } from "@/components/ui/Button";
import { ResetCodePopupProps } from "@/types/inputOtp";

const ResetCodePopup = ({ onClose, email }: ResetCodePopupProps) => {
  const router = useRouter();
  const { resend } = usePasswordReset(() => {});
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const verifyCode = async () => {
    const verificationCode = code.join("");
    const result = verifyOtpSchema.safeParse({ email, otp: verificationCode });

    if (!result.success) {
      setValidationError(result.error.errors[0].message);
      return;
    }

    setValidationError(null);
    setIsVerifying(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: verificationCode }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Invalid or expired code");
      }

      toast.success("Code verified successfully!");
      router.push(`/new-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Verification failed");
      setCode(Array(6).fill(""));
    } finally {
      setIsVerifying(false);
    }
  };

  const resendCode = async () => {
    setIsResending(true);
    await resend(email);
    setCode(Array(6).fill(""));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-10 font-inter">
          <div className="flex items-center w-full mb-8">
            <button
              onClick={onClose}
              className="text-2xl text-black hover:text-gray-800 mr-4"
              type="button"
            >
              ←
            </button>
            <h2 className="text-2xl font-bold text-center flex-1">
              Enter Reset Code
            </h2>
          </div>

          <p className="text-black text-base text-center mb-6">
            We sent a 6-digit code to your email address. Please enter it below.
          </p>

          <OTPInput code={code} setCode={setCode} timeLeft={timeLeft} />

          {validationError && (
            <p className="text-sm text-red-600 text-center mt-2 font-medium">
              {validationError}
            </p>
          )}

          <div className="mt-6 space-y-4 w-full">
            <div className="flex justify-between text-sm text-black">
              <p>
                {timeLeft > 0
                  ? `Code expires in ${formatTime(timeLeft)}`
                  : "Code expired"}
              </p>
              <button
                type="button"
                onClick={resendCode}
                className="text-blue-500 hover:underline"
                disabled={timeLeft > 0 || isResending}
              >
                {isResending ? "Sending..." : "Resend Code"}
              </button>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={verifyCode}
              type="button"
              disabled={
                isVerifying || timeLeft <= 0 || code.some((digit) => !digit)
              }
            >
              {isVerifying ? "Verifying..." : "Verify Code"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetCodePopup;
