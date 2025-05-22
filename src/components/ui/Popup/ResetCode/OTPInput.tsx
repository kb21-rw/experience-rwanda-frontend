"use client";

import React, { useRef } from "react";
import { OTPInputProps } from "@/utils/schemas/resetCodeSchema";
import { Button } from "../../Button";

export const OTPInput: React.FC<OTPInputProps> = ({
  code,
  setCode,
  isVerifying,
  isResending,
  isCodeExpired,
  remainingTime,
  onVerify,
  onResend,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (isCodeExpired) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (isCodeExpired) return;
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (isCodeExpired) return;
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newCode = Array(6)
      .fill("")
      .map((_, i) => pasted[i] || "");
    setCode(newCode);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const isVerifyDisabled =
    isVerifying || isCodeExpired || code.some((digit) => !digit);

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-2">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            aria-label={`OTP digit ${index + 1}`}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={isCodeExpired}
            className={`w-12 h-12 text-xl text-center border rounded-lg outline-none transition focus:ring-2 ${
              isCodeExpired
                ? "bg-red-50 border-red-300 text-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
        ))}
      </div>

      <div className="space-y-4 w-full">
        <div className="flex justify-between text-sm text-black">
          <p>Code expires in 2 minutes</p>
          <button
            type="button"
            onClick={onResend}
            disabled={isResending || (!isCodeExpired && remainingTime !== null)}
            className="underline"
          >
            {isResending ? "Sending..." : "Resend Code"}
          </button>
        </div>
        <Button
          variant="primary"
          className="w-full"
          onClick={onVerify}
          type="button"
          disabled={isVerifyDisabled}
        >
          {isVerifying ? "Verifying..." : "Verify Code"}
        </Button>
      </div>
    </div>
  );
};
