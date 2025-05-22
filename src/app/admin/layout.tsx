import { AppSidebar } from "@/components/SideBar";
import { SidebarProvider } from "@/components/ui/SideBar/sidebar";
import { ReactNode } from "react";
import { cookies } from "next/headers";

export default async function Layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
}

