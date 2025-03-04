import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export type NavItemProp = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};
const NavItem: React.FC<NavItemProp> = ({ href, children, onClick }) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`hover:underline ${isActive ? "underline text-blue-300" : ""}`}
    >
      {children}
    </Link>
  );
};

export default NavItem;
