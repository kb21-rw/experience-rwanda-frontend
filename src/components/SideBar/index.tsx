import { items } from "@/data/sidebarItems"
import { Sidebar, SidebarContent,  SidebarFooter,  SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/SideBar/sidebar"
import { Button } from "../ui/Button"




export function AppSidebar() {
   return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Experience Rwanda Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
        </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
<SidebarFooter>
        <Button >
          Log out
        </Button>
      </SidebarFooter>    </Sidebar>
  )
}

