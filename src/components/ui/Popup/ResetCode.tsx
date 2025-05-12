import React, { useState, useRef, useEffect } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetCodePopupProps {
  onClose: () => void;
  email: string;
}

interface ApiResponse<T> {
  data?: T;
  message?: string;
  errors?: Record<string, string>;
}

const ResetCodePopup = ({ onClose, email }: ResetCodePopupProps) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otpExpiryTime, setOtpExpiryTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (otpExpiryTime) {
      timer = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.ceil((otpExpiryTime - now) / 1000);

        if (timeLeft <= 0) {
          setCode(Array(6).fill(""));
          toast.error("OTP has expired. Please request a new one.");
          setIsVerified(false);
          setOtpExpiryTime(null);
          setRemainingTime(null);
          if (timer) clearInterval(timer);
        } else {
          setRemainingTime(timeLeft);
        }
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [otpExpiryTime]);

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newCode = [...Array(6).fill("")];
      pastedData.split("").forEach((char, index) => {
        newCode[index] = char;
      });
      setCode(newCode);
      const nextEmptyIndex = newCode.findIndex((char) => char === "");
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const verifyCode = async () => {
    if (otpExpiryTime && Date.now() >= otpExpiryTime) {
      toast.error("OTP has expired. Please request a new one.");
      setCode(Array(6).fill(""));
      setIsVerified(false);
      setOtpExpiryTime(null);
      setRemainingTime(null);
      return;
    }

    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-reset-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            code: verificationCode,
          }),
        }
      );

      const data = (await response.json()) as ApiResponse<unknown>;

      if (response.ok) {
        toast.success("Code verified successfully!");
        setIsVerified(true);
        const expiryTime = Date.now() + 2 * 60 * 1000;
        setOtpExpiryTime(expiryTime);
        setRemainingTime(120);
      } else {
        toast.error(data.message || "Invalid verification code");
        setCode(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    } catch (error: unknown) {
      console.error("Verification error:", error);
      toast.error("Failed to verify code. Please try again.");
      setCode(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const resendCode = async () => {
    setIsResending(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/request-password-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = (await response.json()) as ApiResponse<unknown>;

      if (response.ok) {
        toast.success("New code sent successfully!");
        setCode(Array(6).fill(""));
        const expiryTime = Date.now() + 2 * 60 * 1000;
        setOtpExpiryTime(expiryTime);
        setRemainingTime(120);
        inputRefs.current[0]?.focus();
      } else {
        toast.error(data.message || "Failed to resend code");
      }
    } catch (error: unknown) {
      console.error("Resend code error:", error);
      toast.error("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!isVerified) {
      toast.error("Please verify your code first");
      return;
    }

    if (!otpExpiryTime || Date.now() >= otpExpiryTime) {
      toast.error("OTP has expired. Please request a new one.");
      setIsVerified(false);
      setCode(Array(6).fill(""));
      setOtpExpiryTime(null);
      setRemainingTime(null);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            code: code.join(""),
            newPassword: data.newPassword,
          }),
        }
      );

      const responseData = (await response.json()) as ApiResponse<unknown>;
      if (response.ok) {
        toast.success("Password reset successfully!");
        onClose();
      } else {
        toast.error(responseData.message || "Failed to reset password");
      }
    } catch (error: unknown) {
      console.error("Reset password error:", error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");
  const isCodeExpired = otpExpiryTime && Date.now() >= otpExpiryTime;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 font-inter">
          <div className="flex items-center w-full mb-8">
            <button
              onClick={onClose}
              className="text-2xl text-black hover:text-gray-800 mr-4"
              type="button"
            >
              ←
            </button>
            <h2 className="text-2xl font-bold text-center flex-1">
              {isVerified ? "Reset Password" : "Enter Reset Code"}
            </h2>
          </div>

          {!isVerified ? (
            <>
              <p className="text-black text-base text-center mb-8">
                You are almost there! We have sent you six digits code to your
                email. <br />
                <span className="font-semibold">{email}</span>
              </p>

              <div className="flex justify-center gap-4 mb-6">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={code[index]}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className={`w-12 h-12 text-center border rounded-lg text-2xl font-bold focus:ring-2 focus:ring-black outline-none transition-all ${
                        isCodeExpired
                          ? "border-red-500 bg-red-50"
                          : "border-black focus:border-black"
                      }`}
                      disabled={Boolean(isCodeExpired)}
                    />
                  ))}
              </div>

              <div className="flex items-center justify-between w-full text-sm mb-8">
                <span
                  className={`${isCodeExpired ? "text-red-500" : "text-black"}`}
                >
                  {remainingTime !== null
                    ? `Code expires in ${remainingTime}s`
                    : isCodeExpired
                    ? "Code has expired"
                    : "Code will expire in 2 min"}
                </span>
                <button
                  onClick={resendCode}
                  disabled={isResending}
                  className="text-black underline hover:text-gray-800 disabled:opacity-50"
                  type="button"
                >
                  {isResending ? "Sending..." : "Resend code?"}
                </button>
              </div>

              <Button
                onClick={verifyCode}
                disabled={
                  !isCodeComplete || isVerifying || Boolean(isCodeExpired)
                }
                className="w-full bg-black text-white hover:bg-gray-800 rounded-md flex items-center justify-center"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : isCodeExpired ? (
                  "Code Expired"
                ) : (
                  "Verify Code"
                )}
              </Button>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  type="password"
                  placeholder="New Password"
                  {...register("newPassword")}
                  className="w-full"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  className="w-full"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading || Boolean(isCodeExpired)}
                className="w-full bg-black text-white hover:bg-gray-800 rounded-md flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : isCodeExpired ? (
                  "Code Expired"
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetCodePopup;
