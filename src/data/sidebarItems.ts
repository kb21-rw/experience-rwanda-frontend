import { Permission } from "@/auth/rbac";
import { IconType } from "react-icons";
import { FaHome, FaInbox, FaUsers, FaUserPlus } from "react-icons/fa";

export const items: {
  title: string;
  data_test_id: string;
  url: string;
  icon: IconType;
  permission: Permission;
}[] = [
  {
    title: "Dashboard",
    data_test_id:"dashboard-item",
    url: "/admin",
    icon: FaHome,
    permission: "view:dashboard",
  },
  {
    title: "Trips",
    data_test_id:"trips-item",
    url: "/admin/trips",
    icon: FaInbox,
    permission: "view:trips",
  },
  {
    title: "Admins",
    data_test_id:"admins-item",
    url: "/admin/admins",
    icon: FaUsers,
    permission: "view:admins",
  },
  {
    title: "Invite",
    data_test_id:"invite-item",
    url: "/admin/invite",
    icon: FaUserPlus,
    permission: "invite:admins",
  },
];
