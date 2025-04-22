'use client';

import LoginForm from "@/components/admin/auth/LoginForm";
import Image from "next/image";

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src="/uploads/background image.png"
        alt="Background"
        fill
        className="object-cover"
        priority
        quality={100}
      />
      
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 bg-white w-[500px] rounded-md">
        <LoginForm />
      </div>
    </div>
  );
} 