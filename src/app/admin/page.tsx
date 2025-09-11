"use client";
import { AppSidebar } from "@/components/SideBar";
import { SidebarProvider } from "@/components/ui/SideBar/sidebar";
import { ReactNode } from "react";
import Toastify from "@/components/Toastify";
import { AuthProvider } from "@/context/authContext";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AuthProvider>
        <Toastify />
        <AppSidebar />
        <main className="flex-1 w-full">{children}</main>
      </AuthProvider>
    </SidebarProvider>
  );
}
