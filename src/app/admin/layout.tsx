"use client";
import { AppSidebar } from "@/components/SideBar";
import { SidebarProvider } from "@/components/ui/SideBar/sidebar";
import { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login");
    }
  }, [router]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 w-full">{children}</main>
    </SidebarProvider>
  );
}
