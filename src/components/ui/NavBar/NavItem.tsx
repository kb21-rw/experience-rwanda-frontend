"use client";
import React from "react";
import Link from "next/link";

export interface NavItemProps {
  href: string;
  sectionId: string;
  label: string;
  data_test_id?: string;
  onClick?: () => void;
  isActive?: boolean;
  isMobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  sectionId,
  label,
  data_test_id,
  onClick,
  isActive = false,
  isMobile = false,
}) => {
  const isPageName = href.includes("#") || href === "/"
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isPageName) {
      e.preventDefault();
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    onClick?.();
  };

  if (isMobile) {
    return (
      <Link
        href={href}
        onClick={handleClick}
        data-test-id={data_test_id}
        className={`block py-3 px-4 font-medium transition-all duration-200 ${
          isActive
            ? "text-green-700 bg-green-700/10 underline underline-offset-4"
            : "text-green-700 hover:scale-105 hover:shadow-md hover:bg-green-700/5"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      data-test-id={data_test_id}
      className={`px-1 py-2 font-medium transition-all duration-200 ${
        isActive 
          ? "text-green-700 underline underline-offset-4" 
          : "text-green-700 hover:scale-110 hover:font-semibold"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
};

export default NavItem;