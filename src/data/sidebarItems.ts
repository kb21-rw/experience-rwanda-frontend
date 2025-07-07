import { FaHome, FaInbox, FaUsers, FaUserPlus } from "react-icons/fa";

export const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: FaHome,
  },
  {
    title: "Trips",
    url: "/admin/trips",
    icon: FaInbox,
  },
  {
    title: "Admins",
    url: "/admin/admins",
    icon: FaUsers,
  },
  {
    title: "Invite",
    url: "/admin/invite",
    icon: FaUserPlus,
  },
];
