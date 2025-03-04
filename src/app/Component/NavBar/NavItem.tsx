"use client";
import React from "react";
import Link from "next/link";
import { NavItemProp } from "@/types/NavItems.types";
import { usePathname } from "next/navigation";

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
