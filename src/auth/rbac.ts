import { TokenPayload } from "@/types/Admin";

export type User = { roles: Role[]; id: string };

type Role = keyof typeof ROLES;
export type Permission = (typeof ROLES)[Role][number];

const ROLES = {
  SUPER_ADMIN: [
    "view:trips",
    "create:trips",
    "update:trips",
    "delete:trips",
    "view:admins",
    "update:admins",
    "delete:admins",
    "invite:admins",
    "view:bookings",
    "create:bookings",
    "update:bookings",
    "delete:bookings",
    "view:dashboard",
    "export:admins",
    "export:trips",
    "export:bookings",
  ],
  ADMIN: [
    "view:trips",
    "create:trips",
    "update:trips",
    "delete:trips",
    "view:admins",
    "view:bookings",
    "create:bookings",
    "update:bookings",
    "delete:bookings",
    "view:dashboard",
    "export:admins",
    "export:bookings",
  ],
} as const;

export function hasPermission(
  user: TokenPayload | null,
  permission: Permission
) {
  if (!user) {
    return false;
  }
  return (ROLES[user.role] as readonly Permission[]).includes(permission);
}
