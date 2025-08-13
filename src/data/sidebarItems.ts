import { Permission } from "@/auth/rbac";
import { IconType } from "react-icons";
import { FaHome, FaInbox, FaUsers, FaUserPlus } from "react-icons/fa";

export const items: {
  title: string;
  url: string;
  icon: IconType;
  permission: Permission;
}[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: FaHome,
    permission: "view:dashboard",
  },
  {
    title: "Trips",
    url: "/admin/trips",
    icon: FaInbox,
    permission: "view:trips",
  },
  {
    title: "Admins",
    url: "/admin/admins",
    icon: FaUsers,
    permission: "view:admins",
  },
  {
    title: "Invite",
    url: "/admin/invite",
    icon: FaUserPlus,
    permission: "invite:admins",
  },
];
