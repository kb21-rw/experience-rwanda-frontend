"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { redirect } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentRoute = usePathname();
  const { token } = useAuth();
  if (token === null) {
    redirect(`/login?redirect=${currentRoute}`);
  }
  if (token) {
    return <>{children}</>;
  }
}
