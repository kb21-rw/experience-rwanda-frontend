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
import { useRouter, usePathname } from "next/navigation";
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
  // how to get the current route
  const currentPath = usePathname();
  console.log({ currentPath, items });
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

      <Sidebar collapsible={isMobile ? "offcanvas" : "icon"} className="z-20">
        <SidebarContent className="bg-black text-white px-4=">
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
            <SidebarGroupContent
              className={`${state === "expanded" ? "px-4" : "px-0"}`}
            >
              <ProfileContent />
              <Separator className="mb-2.5" />
              <SidebarMenu className="gap-3 pt-4">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={
                        currentPath === item.url
                          ? "text-[#B9B9BA] hover:text-[#B9B9BA] underline"
                          : "hover:text-[#B9B9BA]"
                      }
                      variant="link"
                      asChild
                    >
                      <Link className="flex items-center gap-5" href={item.url}>
                        <item.icon className="w-6 h-6" />
                        <span
                          className={`font-medium text-[1rem] leading-[1.5rem]`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-black">
          {
            <Button
              onClick={handleLogout}
              className="bg-white text-black text-base font-semibold rounded-[10px] py-3- h-12"
            >
              <TbLogout2 />
              {state === "expanded" ? <span>Log out</span> : null}
            </Button>
          }
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
