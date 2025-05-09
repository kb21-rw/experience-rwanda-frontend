"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";

const VerifyOptForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (value && nextInput) (nextInput as HTMLInputElement).focus();
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/request-password-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        setResendMessage("OTP resent to your email.");
      } else {
        setResendMessage(result.message || "Failed to resend OTP.");
      }
    } catch {
      setResendMessage("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    console.log("Verifying OTP:", code);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-10 w-full max-w-md"
    >
      <h1 className="text-3xl font-bold text-center mb-5">Enter Reset Code</h1>
      <p className="text-base text-center mb-8">
        You are almost there! We’ve sent you six digits code to your email, use
        them to fill the boxes below.
      </p>

      <div className="flex justify-center gap-2 py-5">
        {otp.map((digit, index) => (
          <Input
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-10 h-10 border border-black rounded-md text-center text-lg"
          />
        ))}
      </div>

      <div className="flex justify-between items-center mb-10 text-sm">
        <span>Code will expire in 2 min</span>
        <button
          type="button"
          onClick={handleResend}
          className="font-semibold underline"
        >
          Resend code?
        </button>
      </div>

      {resendMessage && (
        <p className="text-center text-xs text-gray-600">{resendMessage}</p>
      )}

      <Button type="submit" variant="primary" className="w-full">
        Veriify
      </Button>
    </form>
  );
};

export default VerifyOptForm;
