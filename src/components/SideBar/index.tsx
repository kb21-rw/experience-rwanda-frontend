"use client";
import { items } from "@/data/sidebarItems";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  Separator,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/SideBar/sidebar";
import { Button } from "../ui/Button";
import ProfileContent from "../ProfileContent.tsx";
import { LuPanelLeft, LuPanelLeftClose } from "react-icons/lu";
import { useSidebar } from "../ui/SideBar/sidebar";
import { TbLogout2 } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/useMobile";

export function AppSidebar() {
  const { toggleSidebar, state } = useSidebar();
  const isMobile = useIsMobile();
  const router = useRouter();
  
  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <>
       {isMobile && (
        <Button 
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          className="bg-transparent text-black hover:bg-transparent shadow-none"
        >
          <LuPanelLeft />
        </Button>
      )}
      
      <Sidebar 
        collapsible={isMobile ? "icon" : "offcanvas"}
        className="z-20" 
      >
        <SidebarContent className="bg-black text-white">
          <SidebarGroup className="gap-6">
            <div
              className={`mt-8 flex ${
                state === "expanded" ? "flex-row items-start" : "flex-col"
              } gap-2`}
            >
              {state === "expanded" && (
                <SidebarGroupLabel className="text-white max-w-[80%] p-0">
                  Experience Rwanda Admin Panel
                </SidebarGroupLabel>
              )}
              <Button onClick={toggleSidebar}>
                <LuPanelLeftClose />
              </Button>
            </div>
            <SidebarGroupContent>
              <ProfileContent />
              <Separator />
              <SidebarMenu className="gap-3 pt-4">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton variant="link" asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-black text-white">
          {
            <Button onClick={handleLogout}>
              <TbLogout2 />
              {state === "expanded" ? <span>Log out</span> : null}
            </Button>
          }
        </SidebarFooter>
      </Sidebar>
    </>
  );
}