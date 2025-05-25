"use client";

import React, { useRef } from "react";
import { Input } from "../../Input";

interface OTPInputProps {
  code: string[];
  setCode: (code: string[]) => void;
  timeLeft: number;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  code,
  setCode,
  timeLeft,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const sanitized = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = sanitized;
    setCode(newCode);
    if (sanitized && index < code.length - 1) {
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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
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

  return (
    <div className="flex justify-center gap-2">
      {code.map((digit, index) => (
        <Input
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
          disabled={timeLeft <= 0}
          className="w-12 h-12 text-xl text-center border rounded-lg border-gray-500"
        />
      ))}
    </div>
  );
};
