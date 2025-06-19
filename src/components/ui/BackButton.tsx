"use client";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="p-2 rounded hover:bg-gray-200 transition"
      aria-label="Go back"
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
  );
};

export default BackButton;
