"use client";
import React from "react";
import Link from "next/link";
import { NavItemProps } from "@/types/NavItems.types";

const NavItem: React.FC<NavItemProps> = ({ href, pathname, children }) => {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`hover:underline ${isActive ? "underline text-blue-300" : ""}`}
    >
     
      {children}
    </Link>
  );
};

export default NavItem;
